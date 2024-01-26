import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from 'src/app-constants';
import { default as config } from '../../../config';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = config.BRM_URL;
  public userData: any;
  public jwtToken: any;
  public userSearchData: string = '';
  public inactiveUserSearchData: string = '';
  public unconfirmedUserSearchData: string = '';

  constructor(private http: HttpClient) {
    this.jwtToken = localStorage.getItem(AppConstants.BRM_TOKEN);
  }

  errorapiFn() {
    localStorage.clear();
  }

  setToken(token: any) {
    this.jwtToken = token;
  }

  checkConnection() {
    return this.http.get(`${this.apiUrl}`);
  }

  userName() {
    return localStorage.getItem(AppConstants.BRM_USER_NAME);
  }
  loginUser(Username: string, Password: string) {
    // console.log('coming');
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let body = {
      Username: Username,
      Password: Password,
    };
    return this.http.post(`${this.apiUrl}/admin/login`, body, { headers });
  }

  verifyToken(Token: string, AdminID: string) {
    // console.log('coming');
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let body = {
      Token: Token,
    };
    return this.http.post(
      `${this.apiUrl}/admin/` + AdminID + `/verify-token`,
      body
    );
  }

  changePassword(Password: string, AdminID: string) {
    //let token = this.localStorageService.get("token");
    // console.log(token, "Token");
    // console.log('coming');
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    let body = {
      Password: Password,
    };
    return this.http.post(
      `${this.apiUrl}/admin/` + AdminID + `/change-password`,
      body,
      { headers: headers }
    );
  }

  // User related stuff here
  /*viewUser(pageNumber, limits) {
    //let token = this.localStorageService.get("token");
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(`${this.apiUrl}/user/all/${pageNumber}/${limits}`, { headers: headers });
  }
  viewInactiveUser(pageNumber, limits) {
    //let token = this.localStorageService.get("token");
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(`${this.apiUrl}/user/inactive/${pageNumber}/${limits}`, { headers: headers });
}*/
  viewActiveUser(searchCriteria: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.post(`${this.apiUrl}/user/active`, searchCriteria, {
      headers: headers,
    });
  }
  viewInactiveUser(searchCriteria: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.post(`${this.apiUrl}/user/inactive`, searchCriteria, {
      headers: headers,
    });
  }
  viewUnconfirmedUser(searchCriteria: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.post(`${this.apiUrl}/user/unconfirmed`, searchCriteria, {
      headers: headers,
    });
  }
  getAllActiveUsers(playerIds: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(`${this.apiUrl}/user/active?ids=${playerIds}`, {
      headers: headers,
    });
  }
  getAllInactiveUsers() {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(`${this.apiUrl}/user/inactive`, { headers: headers });
  }
  getAllUnconfirmedUsers() {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(`${this.apiUrl}/user/unconfirmed`, {
      headers: headers,
    });
  }
  getSearchKeywords() {
    //let token = this.localStorageService.get("token");
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(`${this.apiUrl}/user/search-keywords`, {
      headers: headers,
    });
  }
  getUser(accountID: string) {
    //let token = this.localStorageService.get("token");
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(`${this.apiUrl}/user/` + accountID, {
      headers: headers,
    });
  }
  editUser(userData: any) {
    // console.log('coming');
    //let token = this.localStorageService.get("token");
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.put(
      `${this.apiUrl}/user/` + userData.AccountID,
      userData,
      { headers: headers }
    );
  }
  updateUser(accountID: any, userData: any) {
    // console.log('coming');
    //let token = this.localStorageService.get("token");
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.put(`${this.apiUrl}/user/` + accountID, userData, {
      headers: headers,
    });
  }
  deleteUser(accountID: string) {
    // console.log('coming');
    //let token = this.localStorageService.get("token");
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.delete(`${this.apiUrl}/user/` + accountID, {
      headers: headers,
    });
  }

  // Admin related stuff here
  viewAdmin() {
    //let token = this.localStorageService.get("token");
    // console.log(token, "Token");
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(`${this.apiUrl}/admin/all`, { headers: headers });
  }

  getCounter() {
    //let token = this.localStorageService.get("token");
    // console.log(token, "Token");
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(`${this.apiUrl}/dashboard/counters`, {
      headers: headers,
    });
  }

  getSession(type: string) {
    //let token = this.localStorageService.get("token");
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(`${this.apiUrl}/session/${type}`, {
      headers: headers,
    });
  }

  getPermissions(roleType: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(`${this.apiUrl}/permissions/${roleType}`, {
      headers: headers,
    });
  }

  getMenuItems() {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(`${this.apiUrl}/menu/all`, { headers: headers });
  }

  addMenuItem(menuItem: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.post(`${this.apiUrl}/menu`, menuItem, {
      headers: headers,
    });
  }

  getUserAccountID() {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(`${this.apiUrl}/useraccount`, { headers: headers });
  }

  getUserProfile() {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(`${this.apiUrl}/userprofile`, { headers: headers });
  }

  getAllTransactions() {
    //return this.http.get(`${this.HistoricalDB_URL}/transactions?start=${start}&end=${end}&descending=true&limit=1000`);
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(`${this.apiUrl}/transactions/all`, {
      headers: headers,
    });
  }

  getBRMTransactions(
    start: any,
    end: any,
    pageNumber: any,
    limits: any,
    queryFields: any
  ) {
    //return this.http.get(`${this.HistoricalDB_URL}/transactions?start=${start}&end=${end}&descending=true&limit=1000`);
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(
      `${this.apiUrl}/transactions/${start}/${end}/${pageNumber}/${limits}?q=${queryFields}`,
      { headers: headers }
    );
  }

  getDeposits() {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(`${this.apiUrl}/deposits/all`, { headers: headers });
  }

  getDepositsByRange(start: any, end: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(`${this.apiUrl}/deposits/${start}/${end}`, {
      headers: headers,
    });
  }

  getWithdrawals() {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(`${this.apiUrl}/withdrawals/all`, {
      headers: headers,
    });
  }

  getWithdrawalsRequests() {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(`${this.apiUrl}/withdrawals/requests`, {
      headers: headers,
    });
  }

  updateWithdrawalsRequests(requestData: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.put(`${this.apiUrl}/withdrawals/requests/`, requestData, {
      headers: headers,
    });
  }

  updateDepositAction(requestData: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.put(`${this.apiUrl}/deposit`, requestData, {
      headers: headers,
    });
  }

  updateGameStatus(requestData: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.put(`${this.apiUrl}/games/requests/`, requestData, {
      headers: headers,
    });
  }

  /*getTransaction(tx){
    return this.http.get(`${this.HistoricalDB_URL}/transactions/${tx}`);
}*/

  getAddressTransaction(address: any, pageNumber: any, limits: any) {
    //return this.http.get(`${this.HistoricalDB_URL}/accounts/${address}/transactions?limit=100&descending=true`)
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(
      `${this.apiUrl}/user/${address}/transactions/${pageNumber}/${limits}`,
      { headers: headers }
    );
  }

  getAddressDeposits(address: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(`${this.apiUrl}/user/` + address + `/deposits`, {
      headers: headers,
    });
  }

  getAddressWithdrawals(address: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(`${this.apiUrl}/user/` + address + `/withdrawals`, {
      headers: headers,
    });
  }

  getWagers(address: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(`${this.apiUrl}/user/` + address + `/wagers`, {
      headers: headers,
    });
  }

  getAddressCards(address: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(`${this.apiUrl}/user/` + address + `/cards`, {
      headers: headers,
    });
  }

  getAllGames() {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(`${this.apiUrl}/games/all`, { headers: headers });
  }

  getAllGamesProviders() {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(`${this.apiUrl}/games/providers`, {
      headers: headers,
    });
  }

  getGameByPegination(page: any, limit: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(
      `${this.apiUrl}/game/gameByPagination?page=` + page + `&limit=` + limit,
      { headers: headers }
    );
  }

  addLoyaltySlab(slabData: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.post(`${this.apiUrl}/loyalty`, slabData, {
      headers: headers,
    });
  }

  getAllLoyaltySlabs() {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(`${this.apiUrl}/loyalty/all`, { headers: headers });
  }

  getSlabById(slabId: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(`${this.apiUrl}/loyalty/${slabId}`, {
      headers: headers,
    });
  }

  updateSlab(slabData: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.put(`${this.apiUrl}/loyalty/`, slabData, {
      headers: headers,
    });
  }

  encashLoyaltyPoints(accountId: any, updatedData: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.post(
      `${this.apiUrl}/user/` + accountId + `/loyalty`,
      updatedData,
      { headers: headers }
    );
  }

  updateBalance(accountId: any, updatedData: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.put(
      `${this.apiUrl}/user/` + accountId + `/balance`,
      updatedData,
      { headers: headers }
    );
  }

  changeUserPassword(accountId: any, updatedData: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.put(
      `${this.apiUrl}/user/` + accountId + `/change-password`,
      updatedData,
      { headers: headers }
    );
  }

  activateUser(accountId: any, updatedData: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.put(
      `${this.apiUrl}/user/` + accountId + `/activate`,
      updatedData,
      { headers: headers }
    );
  }

  resendVerificationMail(accountId: any, updatedData: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.post(
      `${this.apiUrl}/user/` + accountId + `/resend-verification-mail`,
      updatedData,
      { headers: headers }
    );
  }

  getLiveSmsReport(timezone: any, from: any, to: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(
      `${this.apiUrl}/sms?t=${timezone}&from=${from}&to=${to}`,
      { headers: headers }
    );
  }

  getLiveDeposits() {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(`${this.apiUrl}/live/deposits`, { headers: headers });
  }

  getLivePlayers() {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(`${this.apiUrl}/live/players`, { headers: headers });
  }

  blockCard(accountId: any, cardDetail: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.post(
      `${this.apiUrl}/user/` + accountId + `/card-block`,
      cardDetail,
      { headers: headers }
    );
  }

  unblockCard(accountId: any, cardDetail: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.post(
      `${this.apiUrl}/user/` + accountId + `/card-unblock`,
      cardDetail,
      { headers: headers }
    );
  }

  getAllCountries() {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(`${this.apiUrl}/country/all`, { headers: headers });
  }

  getStates(countryId: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(`${this.apiUrl}/country/` + countryId + `/states`, {
      headers: headers,
    });
  }

  getAllCoupons() {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(`${this.apiUrl}/coupon/all`, { headers: headers });
  }

  addCoupon(couponData: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.post(`${this.apiUrl}/coupon`, couponData, {
      headers: headers,
    });
  }

  updateCoupon(couponData: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.put(`${this.apiUrl}/coupon`, couponData, {
      headers: headers,
    });
  }

  getGeneralReport(fromDate: any, toDate: any, period: any) {
    //return this.http.get(`${this.HistoricalDB_URL}/accounts/${address}/transactions?limit=100&descending=true`)
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(
      `${this.apiUrl}/report/general/${fromDate}/${toDate}/${period}`,
      { headers: headers }
    );
  }

  getGamesReport(fromDate: any, toDate: any, period: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(
      `${this.apiUrl}/report/games/${fromDate}/${toDate}/${period}`,
      { headers: headers }
    );
  }

  getProcessorsReport(fromDate: any, toDate: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(
      `${this.apiUrl}/report/processors/${fromDate}/${toDate}`,
      { headers: headers }
    );
  }

  getUserNotes(accountID: string) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(`${this.apiUrl}/user/${accountID}/notes`, {
      headers: headers,
    });
  }

  addUserNote(accountID: string, noteData: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.post(`${this.apiUrl}/user/${accountID}/note`, noteData, {
      headers: headers,
    });
  }

  /*getRetentionReport(queryField, condition, orderBy, searchValue, page, limit) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(`${this.apiUrl}/retention?q=${queryField}&c=${condition}&o=${orderBy}&v=${searchValue}&page=${page}&limit=${limit}`, { headers: headers });
}*/

  getRetentionReport(postData: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.post(`${this.apiUrl}/retention`, postData, {
      headers: headers,
    });
  }

  sendSms(postData: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.post(`${this.apiUrl}/sms`, postData, { headers: headers });
  }

  sendSmsNumbers(postData: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.post(`${this.apiUrl}/sms/numbers`, postData, {
      headers: headers,
    });
  }

  getSmsCampaigns(timezone: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(`${this.apiUrl}/sms/campaigns?t=${timezone}`, {
      headers: headers,
    });
  }

  deleteSmsCampaign(campaignID: string) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.delete(`${this.apiUrl}/sms/campaigns/` + campaignID, {
      headers: headers,
    });
  }

  uploadDeal(formData: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.post(`${this.apiUrl}/deal`, formData, {
      headers: headers,
    });
  }

  getAllDeals() {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(`${this.apiUrl}/deal`, { headers: headers });
  }
  updateDeal(affID: string, dealData: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.put(`${this.apiUrl}/affiliate/${affID}/deal`, dealData, {
      headers: headers,
    });
  }
  addDeal(affID: string, dealData: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.post(`${this.apiUrl}/affiliate/${affID}/deal`, dealData, {
      headers: headers,
    });
  }

  getAllAffiliates() {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(`${this.apiUrl}/affiliate`, { headers: headers });
  }

  addAffiliate(affiliateData: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.post(`${this.apiUrl}/affiliate`, affiliateData, {
      headers: headers,
    });
  }

  updateAffiliate(affiliateData: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.put(`${this.apiUrl}/affiliate`, affiliateData, {
      headers: headers,
    });
  }
  getAffiliate(affID: string) {
    //let token = this.localStorageService.get("token");
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(`${this.apiUrl}/affiliate/` + affID, {
      headers: headers,
    });
  }
  getAffiliateDeal(affID: string) {
    //let token = this.localStorageService.get("token");
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(`${this.apiUrl}/affiliate/${affID}/deal`, {
      headers: headers,
    });
  }
  getAffiliateTrackers(affID: string) {
    //let token = this.localStorageService.get("token");
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(`${this.apiUrl}/affiliate/${affID}/tracker`, {
      headers: headers,
    });
  }
  getAffiliateVariables(affID: string) {
    //let token = this.localStorageService.get("token");
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(`${this.apiUrl}/affiliate/${affID}/variable`, {
      headers: headers,
    });
  }
  getAffiliateReport(
    affID: string,
    period: string,
    trackerId: string,
    variable: string,
    from: string,
    to: string
  ) {
    //let token = this.localStorageService.get("token");
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(
      `${this.apiUrl}/affiliate/${affID}/report?p=${period}&t=${trackerId}&v=${variable}&from=${from}&to=${to}`,
      { headers: headers }
    );
  }
  getAffiliateCampaigns(affID: string, page: any, limit: any) {
    //let token = this.localStorageService.get("token");
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(
      `${this.apiUrl}/affiliate/${affID}/campaign/${page}/${limit}`,
      { headers: headers }
    );
  }

  getAllCreatives() {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(`${this.apiUrl}/creative`, { headers: headers });
  }
  updateCreative(creativeData: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.put(`${this.apiUrl}/creative`, creativeData, {
      headers: headers,
    });
  }
  uploadCreative(formData: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.post(`${this.apiUrl}/creative`, formData, {
      headers: headers,
    });
  }

  getAllPaymentProcessors() {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(`${this.apiUrl}/processor`, { headers: headers });
  }
  applyCascade(cascadeData: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.put(`${this.apiUrl}/processor/cascade`, cascadeData, {
      headers: headers,
    });
  }

  getAllCardDeposits(playerId: any, cardNumber: any, paymentGateway: any) {
    let headers = new HttpHeaders({ 'x-api-jwt': this.jwtToken });
    return this.http.get(
      `${this.apiUrl}/card/deposits?pid=` +
        playerId +
        `&cn=` +
        cardNumber +
        `&pg=` +
        paymentGateway,
      { headers: headers }
    );
  }

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/posts`);
  }

  getPostById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/posts/${id}`);
  }

  addPost(post: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/posts`, post);
  }

  updatePost(id: number, post: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/posts/${id}`, post);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/posts/${id}`);
  }
}
