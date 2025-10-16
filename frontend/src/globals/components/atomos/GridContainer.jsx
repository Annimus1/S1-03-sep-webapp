export const GridContainer = ({
  children,
  columns = '1fr',
  rows = 'auto',
  gap = '20px',
  rowGap,
  columnGap,
  style = {}
}) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: columns,
        gridTemplateRows: rows,
        gap: gap,
        ...(rowGap && { rowGap }),
        ...(columnGap && { columnGap }),
        width: '100%',
        ...style
      }}
    >
      {children}
    </div>
  );
};