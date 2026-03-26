const EventContent = ({ content }: { content: string }) => {
  return (
    <section className="w-full bg-white pt-20 pb-160">
      <div className="container !px-250">
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  );
};

export default EventContent;
