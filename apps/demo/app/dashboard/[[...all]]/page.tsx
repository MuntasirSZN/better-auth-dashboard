import { createDashboard, Users } from "better-auth-dashboard/react";

const Dashboard = createDashboard({
  components: [<Users />],
});

export default Dashboard;
