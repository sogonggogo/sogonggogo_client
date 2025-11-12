export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <h1 style={{ 
        fontSize: '2.5rem', 
        fontWeight: 'bold', 
        marginBottom: '1rem',
        color: 'var(--foreground)'
      }}>
        미스터 대박
      </h1>
      <p style={{ 
        fontSize: '1.125rem', 
        color: 'var(--muted-foreground)',
        textAlign: 'center'
      }}>
        특별한 날을 위한 디너 서비스
      </p>
    </div>
  );
}

