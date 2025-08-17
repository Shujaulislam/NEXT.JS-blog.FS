import TetrisLoading from "@/components/ui/tetris-loader";

const loading = () => {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <TetrisLoading
          size="lg"
          speed="normal"
          showLoadingText={true}
          loadingText="Loading page..."
          className="text-black dark:text-white"
        />
      </div>
    </main>
  );
};

export default loading;
