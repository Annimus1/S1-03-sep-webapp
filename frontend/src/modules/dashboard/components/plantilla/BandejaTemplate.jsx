export const BandejaTemplate = ({ children, title, filterButton }) => {
  const styles = {
    wrapper: {
      background: '#FFFFFF',
      padding: '2rem 0',
      border: '1px solid #21255233',
      borderRadius: '40px',
      overflowX: 'hidden',
      height: '350px',
      overflow: 'hidden',
    },
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 2rem'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem'
    },
    title: {
      fontSize: '2rem',
      fontWeight: '600',
      color: '#2c2c2c',
      margin: 0
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>{title}</h1>
          {filterButton}
        </div>
        {children}
      </div>
    </div>
  );
};