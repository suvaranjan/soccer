import axios from 'axios'
export const baseUrl = "https://soccer-jy02.onrender.com/api";


const getHeader = (token) => {
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
};

export async function getUserHeader(token) {

    const response = await axios.get(`${baseUrl}/user/get-header-data`, {
        headers: getHeader(token),
    });

    return response;
};

export async function getPlayerProfile(token) {

    const response = await axios.get(`${baseUrl}/player/profile`, {
        headers: getHeader(token),
    });

    return response;
};

export async function getManagerProfile(token) {

    const response = await axios.get(`${baseUrl}/manager/profile`, {
        headers: getHeader(token),
    });

    return response;
};

export async function getUserProfile(token) {

    const response = await axios.get(`${baseUrl}/user/profile`, {
        headers: getHeader(token),
    });

    return response;
};

export async function updateUserProfile(token, data) {

    const response = await axios.put(`${baseUrl}/user/profile-update`, data, {
        headers: getHeader(token),
    });

    return response;
};

export async function updatePlayerBasicInfo(token, data) {

    const response = await axios.put(`${baseUrl}/player/basic-info-update`, data, {
        headers: getHeader(token),
    });

    return response;
};

export async function updateManagerBasicInfo(token, data) {

    const response = await axios.put(`${baseUrl}/manager/basic-info-update`, data, {
        headers: getHeader(token),
    });

    return response;
};

export async function updatePlayerStrength(token, data) {

    const response = await axios.put(`${baseUrl}/player/update-strength`, data, {
        headers: getHeader(token),
    });

    return response;
};

export async function addFunds(token, data) {

    const response = await axios.post(`${baseUrl}/user/add-currency`, data, {
        headers: getHeader(token),
    });

    return response;
};

export async function getBalance(token, data) {

    const response = await axios.post(`${baseUrl}/user/get-balance`, data, {
        headers: getHeader(token),
    });

    return response;
};

export async function createPlayer(token, data) {

    const response = await axios.post(`${baseUrl}/manager/add-player`, data, {
        headers: getHeader(token),
    });

    return response;
};

export async function getMyPlayers(token) {

    const response = await axios.get(`${baseUrl}/manager/get-players`, {
        headers: getHeader(token),
    });

    return response;
};

export async function checkPlayerTeam(token, playerId) {

    const response = await axios.post(`${baseUrl}/player/check-player-team`, playerId, {
        headers: getHeader(token),
    });

    return response;
};

export async function searchPlayers(token, keyword) {

    const response = await axios.post(`${baseUrl}/player/search-players`, keyword, {
        headers: getHeader(token),
    });

    return response;
};

export async function createTeam(token, data) {

    const response = await axios.post(`${baseUrl}/team/create-team`, data, {
        headers: getHeader(token),
    });

    return response;
};

export async function getManagerTeams(token) {

    const response = await axios.get(`${baseUrl}/manager/get-teams`, {
        headers: getHeader(token),
    });

    return response;
};

export async function getTeam(token, teamId) {

    const response = await axios.get(`${baseUrl}/team/get-team/${teamId}`, {
        headers: getHeader(token),
    });

    return response;
};

export async function addPlayerToTeam(token, teamId, playerId) {

    const response = await axios.post(`${baseUrl}/team/add-player`, { teamId, playerId }, {
        headers: getHeader(token),
    });

    return response;
};

export async function updateTeamBasicInfo(token, data) {

    const response = await axios.put(`${baseUrl}/team/update-team`, data, {
        headers: getHeader(token),
    });

    return response;
};

export async function getPlayer(token, playerId) {

    const response = await axios.get(`${baseUrl}/player/get-player/${playerId}`, {
        headers: getHeader(token),
    });

    return response;
};

export async function updateManagerPlayer(token, playerId, data) {

    const response = await axios.put(`${baseUrl}/manager/update-player/${playerId}`, data, {
        headers: getHeader(token),
    });

    return response;
};

export async function sendTeamInvitation(token, playerId, teamId) {

    const response = await axios.post(`${baseUrl}/team/send-invitation`, { playerId, teamId }, {
        headers: getHeader(token),
    });

    return response;
};

export async function myTeamInvitations(token) {

    const response = await axios.get(`${baseUrl}/player/team-invitations`, {
        headers: getHeader(token),
    });

    return response;
};

export async function rejectInvitation(token, teamId) {

    const response = await axios.post(`${baseUrl}/player/reject-invitation`, { teamId }, {
        headers: getHeader(token),
    });

    return response;
};

export async function acceptInvitation(token, teamId) {

    const response = await axios.post(`${baseUrl}/player/accept-invitation`, { teamId }, {
        headers: getHeader(token),
    });

    return response;
};

export async function getNotifications(token) {

    const response = await axios.get(`${baseUrl}/notifications`, {
        headers: getHeader(token),
    });

    return response;
};

export async function markSeenNotification(token, id) {

    const response = await axios.put(`${baseUrl}/notifications/${id}/mark-seen`, {}, {
        headers: getHeader(token),
    });

    return response;
};

export async function getAllTeams(token, currentPage, limit) {

    const response = await axios.get(`${baseUrl}/team/all-teams?page=${currentPage}&limit=${limit}`, {
        headers: getHeader(token),
    });

    return response;
};

export async function getAllPlayers(token, currentPage, limit) {

    const response = await axios.get(`${baseUrl}/player/all-players?page=${currentPage}&limit=${limit}`, {
        headers: getHeader(token),
    });

    return response;
};

export const getTeamsBySearch = async (token, currentPage, limit, keyword) => {

    const response = await axios.post(`${baseUrl}/team/search-teams?page=${currentPage}&limit=${limit}`, { keyword }, {
        headers: getHeader(token),
    });
    return response;
};

export async function getPlayersBySearch(token, currentPage, limit, keyword) {

    const response = await axios.post(`${baseUrl}/player/search-all-players?page=${currentPage}&limit=${limit}`, { keyword }, {
        headers: getHeader(token),
    });

    return response;
};

export async function checkPlayerManager(token, playerId, managerId) {

    const response = await axios.post(`${baseUrl}/player/check-player-manager`, { playerId, managerId }, {
        headers: getHeader(token),
    });

    return response;
};

export async function checkManagerTeam(token, teamId, managerId) {

    const response = await axios.post(`${baseUrl}/team/check-team-manager`, { teamId, managerId }, {
        headers: getHeader(token),
    });

    return response;
};

export async function SendJoinReqToTeam(token, teamId) {

    const response = await axios.post(`${baseUrl}/player/send-join-req-team`, { teamId }, {
        headers: getHeader(token),
    });

    return response;
};

export async function playerTeamJoinRequests(token) {

    const response = await axios.get(`${baseUrl}/team/player-join-requests`, {
        headers: getHeader(token),
    });

    return response;
};

export async function playerJoinReqAccept(token, teamId, playerId) {

    const response = await axios.post(`${baseUrl}/team/join-requests-accept`, { teamId, playerId }, {
        headers: getHeader(token),
    });

    return response;
};

export async function playerJoinReqReject(token, teamId, playerId) {

    const response = await axios.post(`${baseUrl}/team/join-requests-reject`, { teamId, playerId }, {
        headers: getHeader(token),
    });

    return response;
};