interface PageProps {
  params: Promise<{ videoId: string }>;
}
// Client components cannot be a syncronised component
// Understand these questions
// Async and Await
// How to pass parameter
// The use of {}
// Client Components and Server Components
const Page = async ({ params }: PageProps) => {
  const { videoId } = await params;
  return <div>Video Id page: {videoId}</div>;
};

export default Page;
