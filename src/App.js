import React, { useEffect, useState } from 'react';

const API_URL =
  '/macros/s/AKfycbzrLBcj7VKEjF5yGHJT22C8SNtg_q3mJV1bH1adxomCswKpfu4aEeLxgaBedFANVVhl/exec';

export default function App() {
  const [type, setType] = useState('pricing');

  const [products, setProducts] = useState([]);
  const [summary, setSummary] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const res = await fetch(API_URL, {
          method: 'POST',
          body: JSON.stringify({
            accessToken: 'secret-token',
            type: type,
          }),
        });

        const data = await res.json();

        if (data.error) {
          setError(data.error);
          setProducts([]);
          setSummary(null);
        } else {
          setProducts(data.products);
          setSummary(data.summary);
        }
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [type]);

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Dashboard</h2>

      {/* Buttons for switching */}
      <button onClick={() => setType('pricing')}>Pricing Analytics</button>
      <button onClick={() => setType('reviews')} style={{ marginLeft: '10px' }}>
        Review Sentiment
      </button>

      <hr />

      {/* Loading / Error */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Summary Cards */}
      {!loading && summary && (
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          {type === 'pricing' && (
            <>
              <div style={cardStyle}>
                <h4>Total Products</h4>
                <p>{summary.totalProducts}</p>
              </div>

              <div style={cardStyle}>
                <h4>Average Price</h4>
                <p>{summary.averagePrice}</p>
              </div>

              <div style={cardStyle}>
                <h4>Total Stock</h4>
                <p>{summary.totalStock}</p>
              </div>
            </>
          )}

          {type === 'reviews' && (
            <>
              <div style={cardStyle}>
                <h4>Total Products</h4>
                <p>{summary.totalProducts}</p>
              </div>

              <div style={cardStyle}>
                <h4>Average Sentiment</h4>
                <p>{summary.averageSentimentScore}</p>
              </div>

              <div style={cardStyle}>
                <h4>Top Product ID</h4>
                <p>{summary.highestSentimentScoreProductId}</p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Search */}
      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: '8px', width: '300px' }}
      />

      <br />
      <br />

      {/* Table */}
      {!loading && filteredProducts.length === 0 ? (
        <p>No products found</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{ borderCollapse: 'collapse' }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>

              {type === 'pricing' && (
                <>
                  <th>Price</th>
                  <th>Discount %</th>
                  <th>Discounted Price</th>
                  <th>Stock</th>
                  <th>Brand</th>
                  <th>Status</th>
                </>
              )}

              {type === 'reviews' && (
                <>
                  <th>Sentiment Score</th>
                  <th>Review Score</th>
                  <th>Reviews</th>
                </>
              )}
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.title}</td>

                {type === 'pricing' && (
                  <>
                    <td>{p.price}</td>
                    <td>{p.discountPercentage}</td>
                    <td>{p.discountedPrice}</td>
                    <td>{p.stock}</td>
                    <td>{p.brand}</td>
                    <td>{p.status}</td>
                  </>
                )}

                {type === 'reviews' && (
                  <>
                    <td>{p.sentimentScore}</td>
                    <td>{p.reviewScore}</td>
                    <td>
                      <button
                        onClick={() => {
                          setReviews(p.reviews);
                          setShowModal(true);
                        }}
                      >
                        View
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Simple Modal */}
      {showModal && (
        <div style={modalStyle}>
          <div style={modalBoxStyle}>
            <h3>Reviews</h3>

            {reviews.map((r, i) => (
              <p key={i}>• {r}</p>
            ))}

            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

const cardStyle = {
  border: '1px solid gray',
  padding: '10px',
  width: '200px',
  borderRadius: '5px',
};

const modalStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalBoxStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  width: '400px',
};
