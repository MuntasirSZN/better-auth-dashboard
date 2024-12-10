const Dashboard = async ({ params }: { params: Promise<{ all: string }> }) => {
  return <h1>My Page {JSON.stringify((await params).all)}</h1>;
};

export const createDashboard = () => {
  return Dashboard;
}

