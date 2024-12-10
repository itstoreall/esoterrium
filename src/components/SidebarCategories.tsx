import Section from '@/src/components/Section';

const SidebarCategories = () => {
  return (
    <div className="article-details-sidebar-categories">
      <Section className="sidebar-title-section">
        <h3 className="sidebar-title">Рубрики</h3>
      </Section>
      <div style={{ marginBottom: '1rem' }}>Нумерология</div>
      <div style={{ marginBottom: '1rem' }}>Астрология</div>
      <div style={{ marginBottom: '1rem' }}>Матрица</div>
      <div style={{ marginBottom: '1rem' }}>Практики</div>
      <div style={{ marginBottom: '1rem' }}>Книги</div>
    </div>
  );
};

export default SidebarCategories;
