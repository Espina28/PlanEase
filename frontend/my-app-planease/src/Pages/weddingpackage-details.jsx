import Rose from '../assets/Rose.png';
import Tulip from '../assets/Tulip.jpg';
import CherryBlossom from '../assets/Bloom.jpg';

const WeddingPackagePage = () => {
  const inclusions = [
    "Catering", "Decorations", "Bridal Gown (Owned)", "Groom Suit (Owned)",
    "Bridal Entourage gown, suit and flowers", "4 Tier Wedding Cake & Cupcakes",
    "Wine for Toasting", "Invitations & Souvenirs", "Bridal Car", "Van Service",
    "Sounds & Lights", "Professional Host", "Doves", "Wedding Coordinator",
    "Wedding Makeup", "Photobooth", "Photography & Videography", "SDE",
    "1 Lechon", "Mobile Bar", "Dessert Station"
  ];

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem', background: '#f9f9f9' }}>

      {/* Breadcrumb */}
      <p style={{ margin: '1rem 0', color: '#555' }}>Home / Wedding Packages</p>

      {/* Main content */}
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
        <img
          src={Tulip}
          alt="Tulip Package"
          style={{ width: '40%', borderRadius: '10px' }}
        />
        <div style={{
          background: '#fff',
          padding: '2rem',
          borderRadius: '10px',
          flex: 1,
          boxShadow: '0 0 10px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>200 Pax</h3>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>TULIP PACKAGE</h1>
          <p style={{ fontSize: '1.5rem', color: '#333', margin: '1rem 0' }}>₱450,000</p>

          <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>What's Included</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {inclusions.map((item, index) => (
              <span
                key={index}
                style={{
                  backgroundColor: '#ffe6b3',
                  padding: '0.5rem 1rem',
                  borderRadius: '999px',
                  fontSize: '0.9rem'
                }}
              >
                {item}
              </span>
            ))}
          </div>

          <button
            style={{
              marginTop: '2rem',
              backgroundColor: '#111',
              color: 'white',
              padding: '1rem',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            BOOK A WEDDING
          </button>
        </div>
      </div>

      {/* Other packages */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{
          flex: 1,
          backgroundColor: '#fff',
          padding: '1rem',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          boxShadow: '0 0 10px rgba(0,0,0,0.05)'
        }}>
          <img src={CherryBlossom} alt="Cherry Blossoms" style={{ width: '40px' }} />
          <span>Cherry Blossoms Package</span>
        </div>
        <div style={{
          flex: 1,
          backgroundColor: '#fff',
          padding: '1rem',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          boxShadow: '0 0 10px rgba(0,0,0,0.05)'
        }}>
          <img src={Rose} alt="Rose" style={{ width: '40px' }} />
          <span>Rose Package</span>
        </div>
      </div>

      {/* Footer features */}
      <div style={{ display: 'flex', justifyContent: 'space-between', background: '#fff', padding: '2rem', borderRadius: '10px' }}>
        <div style={{ textAlign: 'center' }}>
          <div role="img" aria-label="Vendors">🛠️</div>
          <p>Trusted Professionals</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div role="img" aria-label="Payments">✅</div>
          <p>Secure & Easy</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div role="img" aria-label="Packages">📦</div>
          <p>Event-Ready Options</p>
        </div>
      </div>
    </div>
  );
};

export default WeddingPackagePage;
