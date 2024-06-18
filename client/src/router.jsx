import { Navigate, createBrowserRouter } from "react-router-dom";
import Register from "./components/auth/Register";
import NavLayout from "./NavLayout";
import Login from "./components/auth/login";
import ChooseRole from "./components/auth/ChooseRole";
import Dashboard from "./components/dashboard/Dashboard";
import Setting from "./components/setting/Setting";
import MyTeams from "./components/team/MyTeams";
import MyPlayers from "./components/player/MyPlayers";
import TeamForm from "./components/team/createTeam/TeamForm";
import TeamPage from "./components/team/singleTeam/TeamPage";
import AddPlayer from "./components/player/addplayer/AddPlayer";
import Notification from "./components/Notification";
import Profile from "./components/profile/Profile";
import SearchComp from "./components/search/SearchComp";
import AddFunds from "./components/addFunds/AddFunds";
import Player from "./components/player/singlePlayer/Player";
import TeamInvitations from "./components/player/invitations/TeamInvitations";
import AllTeams from "./components/team/allteams/AllTeams";
import AllPlayers from "./components/player/allplayers/AllPlayers";
import PlayerJoinRequests from "./components/team/PlayerJoinRequests";

export const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/choose",
    element: <ChooseRole />,
  },
  {
    path: "/",
    element: <NavLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" /> },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/create-team",
        element: <TeamForm />,
      },
      {
        path: "/add-player",
        element: <AddPlayer />,
      },
      {
        path: "/setting",
        element: <Setting />,
      },
      {
        path: "/my-teams",
        element: <MyTeams />,
      },
      {
        path: "/my-players",
        element: <MyPlayers />,
      },
      {
        path: "/team/:teamId",
        element: <TeamPage />,
      },
      {
        path: "/notifications",
        element: <Notification />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/search",
        element: <SearchComp />,
      },
      {
        path: "/add-funds",
        element: <AddFunds />,
      },
      {
        path: "/player/:playerId",
        element: <Player />,
      },
      {
        path: "/team/invitations",
        element: <TeamInvitations />,
      },
      {
        path: "/team/player-join-requests",
        element: <PlayerJoinRequests />,
      },
      {
        path: "/all-teams",
        element: <AllTeams />,
      },
      {
        path: "/all-players",
        element: <AllPlayers />,
      },
    ],
  },
]);
