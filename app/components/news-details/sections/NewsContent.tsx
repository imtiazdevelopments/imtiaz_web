const NewsContent = ({ content }: { content: string }) => {
  return (
    <section className="w-full bg-white pt-20 pb-50">
      <div className="container container-spacing-details-page">
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  );
};

export default NewsContent;
