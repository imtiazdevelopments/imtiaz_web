const EventContent = ({ content }: { content: string }) => {
  return (
    <section className="w-full bg-white pt-20 pb-120 3xl:pb-160" data-header="dark">
      <div className="container container-spacing-details-page">
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  );
};

export default EventContent;
