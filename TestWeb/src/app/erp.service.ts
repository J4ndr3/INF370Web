import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { url } from 'inspector';
import { HttpHeaders } from '@angular/common/http';
import { NavComponent } from '../app/nav/nav.component'
// declare var require: any;
@Injectable({
  providedIn: 'root'
})
export class ERPService {
  nError: any;
  nMessage: any;
  nID: any;
  constructor(private http: HttpClient, private nav: NavComponent) { }
  GetRanger() {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Read", "Rangers retrieved");
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Rangers')
  }
  GetRangers(id) {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Read", "Rangers "+id+" retrieved");
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/rangers/'+id)
  }
  GetPerformance() {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Read", "Retrieved patrol markers for Performance report");
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Patrol_Marker')
  }
  GetIncedent_Patrole() {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Read", "Retrieved patrol incidents for Incident report")
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Incident_Patrol/GetIncident_Patrol1')
  }
  GetMarker() {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Read", "Retrieved Markers")
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Markers')
  }
  GetRangerVehicle() {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Read", "Retrieved Ranger Vehicles")
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Ranger_Vehicle')
  }
  GetAssets() {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Read", "Retrieved Assets")
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Assets')
  }
  PostRanger(obj) {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Create", "Added a new Ranger: "+obj.Name +" "+obj.Surname)
    return this.http.post('https://2019group4inf370.azurewebsites.net/api/rangers/', obj)
  }
  DeleteRaner(id) {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Delete", "Removed ranger with ID: "+id)
    return this.http.delete('https://2019group4inf370.azurewebsites.net/api/Rangers/' + id)
  }
  PutRanger(id, obj) {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Update", "Changed Ranger details for: "+obj.Name +" "+obj.Surname)
    return this.http.put('https://2019group4inf370.azurewebsites.net/api/Rangers/' + id, obj)
  }

  GetUserRole() {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Read", "Retrieved User roles")
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/User_Role')
  }
  PostUserRole(obj) {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Create", "Added a new user role with name: " +obj.Description)
    return this.http.post('https://2019group4inf370.azurewebsites.net/api/User_Role', obj)
  }
  DeleteUserRole(id) {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Delete", "Removed User role with ID: "+id)
    return this.http.delete('https://2019group4inf370.azurewebsites.net/api/User_Role/' + id)
  }
  PutUserRole(id, obj) {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Update", "Changed User role details for: "+obj.Description )
    return this.http.put('https://2019group4inf370.azurewebsites.net/api/User_Role/' + id, obj)
  }

  GetGender() {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Read", "Retrieved Gender")
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Genders')
  }
  PostGender(obj) {
    return this.http.post('https://2019group4inf370.azurewebsites.net/api/Genders', obj)
  }
  DeleteGender(id) {
    return this.http.delete('https://2019group4inf370.azurewebsites.net/api/Genders/' + id)
  }
  PutGender(id, obj) {
    return this.http.put('https://2019group4inf370.azurewebsites.net/api/Genders/' + id, obj)
  }

  GetStatus() {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Read", "Retrieved Asset Status")
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Asset_Status')
  }
  PostStatus(obj) {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Create", "Created a new Asset Status")
    return this.http.post('https://2019group4inf370.azurewebsites.net/api/Asset_Status', obj)
  }
  DeleteStatus(id) {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Delete", "Remove Asset Status with ID: "+id)
    return this.http.delete('https://2019group4inf370.azurewebsites.net/api/Asset_Status/' + id)
  }
  PutStatus(id, obj) {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Update", "Updated Asset Status with ID: "+id)
    return this.http.put('https://2019group4inf370.azurewebsites.net/api/Asset_Status/' + id, obj)
  }

  GetMedicalAid() {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Read", "Retrieved Medical aids")
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Medical_Aid')
  }
  PostMedicalAid(obj) {
    return this.http.post('https://2019group4inf370.azurewebsites.net/api/Medical_Aid', obj)
  }
  DeleteMedicalAid(id) {
    return this.http.delete('https://2019group4inf370.azurewebsites.net/api/Medical_Aid/' + id)
  }
  PutMedicalAid(id, obj) {
    return this.http.put('https://2019group4inf370.azurewebsites.net/api/Medical_Aid/' + id, obj)
  }

  GetOrganisation() {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Read", "Retrieved Organisations")
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Organisations')
  }
  PostOrganisation(obj) {
    return this.http.post('https://2019group4inf370.azurewebsites.net/api/Organisations', obj)
  }
  DeleteOrganisation(id) {
    return this.http.delete('https://2019group4inf370.azurewebsites.net/api/Organisations/' + id)
  }
  PutOrganisation(id, obj) {
    return this.http.put('https://2019group4inf370.azurewebsites.net/api/Organisations/' + id, obj)
  }
  GetIncident_Levels() {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Read", "Retrieved Incident Levels")
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Incident_Level')
  }
  DeleteIncident_Level(id) {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Delete", "Removed Incident Level")
    return this.http.delete('https://2019group4inf370.azurewebsites.net/api/Incident_Level/' + id)
  }
  PostIncident_Level(obj) {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Create", "Create new Incident Level with name: "+obj.Description)
    return this.http.post('https://2019group4inf370.azurewebsites.net/api/Incident_Level', obj)
  }
  GetIncident_Level(id) {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Read", "Retrieved Incicent Level with ID: "+id)
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Incident_Level/'+id)
  }
  PutIncident_Level(id, obj) {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Update", "Updated Incident Level with ID: "+id +" with description: "+obj.Description)
    return this.http.put('https://2019group4inf370.azurewebsites.net/api/Incident_Level/' + id, obj)
  }
  GetIncident_Types() {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Read", "Retrieved Incident Type")
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Incident_Type')
  }
  DeleteIncident_Type(id) {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Delete", "Retrieved Incident Type with ID: "+id)
    return this.http.delete('https://2019group4inf370.azurewebsites.net/api/Incident_Type/' + id)
  }
  PostIncident_Type(obj){
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Create", "Created new Incident Type")
    return this.http.post('https://2019group4inf370.azurewebsites.net/api/Incident_Type', obj)
  }
  GetIncident_Type(id) {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Read", "Retrieved Incident Type by ID: "+id)
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Incident_Type/'+id)
  }
  PutIncident_Type(id, obj) {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Update", "Update Incident Type with ID: " +id)
    return this.http.put('https://2019group4inf370.azurewebsites.net/api/Incident_Type/' + id, obj)
  }
  GetIncidents(){
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Read", "Retrieved All Incidents")
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Incident_Patrol')
  }

  GetIncident(id){
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Read", "Retrieved Incident with ID: "+id)
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Incidents/'+id)
  }
  PutIncident(id, obj) {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Update", "Update Incident with ID: "+id )
    return this.http.put('https://2019group4inf370.azurewebsites.net/api/Incidents/' + id, obj)
  }

  sendNotif(title, message) {
    var notificationData = {
      to: '/topics/ERP',
      "notification": {
        "body": message,
        "content_available": true,
        "priority": "high",
        "title": title
      },
      "data": {
        "body": message,
        "content_available": true,
        "priority": "high",
        "title": title
      }
    }
    $.ajax({
      type: 'POST',
      url: 'https://fcm.googleapis.com/fcm/send',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'key=AAAAqtm61OY:APA91bFuJ-nIBwEtNOviWzhO7lJCyeaIS84Ay2XP9CjY-hHe4O6GR7XVHAL7TVzjd5pLwRZ6wQgwFbKYMKrdIFMthWtpLFMRCjOUyONqXvoTkgxqAqfZ-0dyuet0p2s-DhvujLydLfZT'
      },
      data: JSON.stringify(notificationData),
      success: function(response){
        console.log(response);
      },
    });
  }
  GetRewardAdd() {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Read", "Retrieved Product rewards")
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Product_Reward')
  }
  PutRewardAdd(ID,obj) {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Update", "Update Product Rewards with ID: "+ID)
    return this.http.put('https://2019group4inf370.azurewebsites.net/api/Product_Reward/'+ID,obj)
  }
  PutEventRewardAdd(ID,obj) {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Update", "Update Event Rewards with ID: "+ID)
    return this.http.put('https://2019group4inf370.azurewebsites.net/api/Event_Reward/'+ID,obj)
  }
  GetRewardAdds(id) {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Read", "Retrieved Product reward with ID: "+id)
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Product_Reward/'+id)
  }
  GetEventRewardAdds(id) {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Read", "Retrieved Event reward with ID: "+id)
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Event_Reward/'+id)
  }
  DeleteRewardAdd(id) {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Delete", "Delete Product reward with ID: "+id)
    return this.http.delete('https://2019group4inf370.azurewebsites.net/api/Product_Reward/' + id)
  }
  DeleteEventRewardAdd(id) {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Delete", "Delete Event reward with ID: "+id)
    return this.http.delete('https://2019group4inf370.azurewebsites.net/api/Event_Reward/' + id)
  }
  GetEventRewardAdd(){
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Read", "Retrieved Event Rewards")
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Event_Reward')
  }
  PostRewardAdd(obj) {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Create", "Create new Product Reward")
    return this.http.post('https://2019group4inf370.azurewebsites.net/api/Product_Reward', obj)
  }
  PostEventRewardAdd(obj){
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Create", "Create new Event Rewards")
    return this.http.post('https://2019group4inf370.azurewebsites.net/api/Event_Reward', obj)
  }
  GetEventType() {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Read", "Retrieved Event Types")
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Event_Type')
  }
  PostEventType(obj) {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Create", "Create new Event Type")
    return this.http.post('https://2019group4inf370.azurewebsites.net/api/Event_Type', obj)
  }
  PutEventType(ID,obj) {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Update", "Updated Event Type")
    return this.http.put('https://2019group4inf370.azurewebsites.net/api/Event_Type/'+ID,obj)
  }
  GetEventTypes(id) {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Read", "Retrieved Event Type by ID: "+id)
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Event_Type/'+id)
  }
  GetProductType(){
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Read", "Retrieved Product Types")
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Product_Type')
  }
  DeleteEventType(id) {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Delete", "Delete Event Type by ID: "+id)
    return this.http.delete('https://2019group4inf370.azurewebsites.net/api/Event_Type/' + id)
  }
  PostProductType(obj){
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Create", "Create new Product type")
    return this.http.post('https://2019group4inf370.azurewebsites.net/api/Product_Type', obj)
  }
  PutProductType(ID,obj) {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Update", "Update product type with ID: " )
    return this.http.put('https://2019group4inf370.azurewebsites.net/api/Product_Type/'+ID,obj)
  }
  GetProductTypes(id) {
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Product_Type/'+id)
  }
  DeleteProductType(id) {
    return this.http.delete('https://2019group4inf370.azurewebsites.net/api/Product_Type/' + id)
  }
  GetAsset(ID) {
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Assets/'+ID)
  }
  GetSupplier() {
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Suppliers')
  }
  PostSupplier(obj) {
    return this.http.post('https://2019group4inf370.azurewebsites.net/api/Suppliers', obj)
  }
  
  PutSupplier(ID, obj) {
    return this.http.put('https://2019group4inf370.azurewebsites.net/api/Suppliers/' + ID, obj)
  }

  DeleteSupplier(id) {
    return this.http.delete('https://2019group4inf370.azurewebsites.net/api/Suppliers/' + id)
  }

  GetOrder() {
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Orders')
  }
  GetOrders(ID) {
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Orders/'+ID)
  }
  PostOrder(obj) {
    return this.http.post('https://2019group4inf370.azurewebsites.net/api/Orders', obj)
  }
  
  PutOrder(ID, obj) {
    return this.http.put('https://2019group4inf370.azurewebsites.net/api/Orders/' + ID, obj)
  }

  DeleteOrder(id) {
    return this.http.delete('https://2019group4inf370.azurewebsites.net/api/Orders/' + id)
  }

  GetTypes() {
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Asset_Type')
  }
  // sendNotif(title,message) {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Postman-Token': '7946b969-a677-4a17-8fc0-23e6a5f1081d',
  //       'cache-control': 'no-cache',
  //       'Content-Type': 'application/json',
  //       Authorization: 'key=AAAAqtm61OY:APA91bFuJ-nIBwEtNOviWzhO7lJCyeaIS84Ay2XP9CjY-hHe4O6GR7XVHAL7TVzjd5pLwRZ6wQgwFbKYMKrdIFMthWtpLFMRCjOUyONqXvoTkgxqAqfZ-0dyuet0p2s-DhvujLydLfZT'
  //     })
  //   };
  //   var url: 'https://fcm.googleapis.com/fcm/send';
  //   var body:"{to: '/topics/ERP',notification:{body: message,  content_available: true,priority: 'high',title: title},data:{body: message,content_available: true,priority: 'high',title: title}}";
  //   console.log("1");
  //   // request(options, function (error, response, body) {
  //   //   if (error) throw new Error(error);

  //   //   console.log(body);
  //   // });
  //   return this.http.post(url,body,httpOptions)
    
  GetGates() {
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Gates')
  }
  PutGates(ID, obj) {
    return this.http.put('https://2019group4inf370.azurewebsites.net/api/Gates/' + ID, obj)
  }
  GetGate(id) {
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Gates/' + id)
  }
  GetReserves() {
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Reserves')
  }
  PostGate(obj) {
    return this.http.post('https://2019group4inf370.azurewebsites.net/api/Gates/', obj)
  }
  DeleteGate(id) {
    return this.http.delete('https://2019group4inf370.azurewebsites.net/api/Gates/' + id)
  }
  showModal(err, message) {
    this.nError = err;
    this.nMessage = message;
    this.nav.err = err;
    this.nav.message = message;
    document.getElementById('generalMod').click();
  }
  PostReserve(obj) {
    return this.http.post('https://2019group4inf370.azurewebsites.net/api/Reserves', obj)
  }
  GetReserve(id) {
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Reserves/' + id)
  }
  PutReserve(ID, obj) {
    return this.http.put('https://2019group4inf370.azurewebsites.net/api/Reserves/' + ID, obj)
  }
  DeleteReserve(id) {
    return this.http.delete('https://2019group4inf370.azurewebsites.net/api/Reserves/' + id)
  }
  GetSecurities() {
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Security_Company')
  }
  PutSecurities(ID, obj) {
    return this.http.put('https://2019group4inf370.azurewebsites.net/api/Security_Company/' + ID, obj)
  }
  GetSecurity(id) {
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Security_Company/' + id)
  }
  PostSecurity(obj) {
    return this.http.post('https://2019group4inf370.azurewebsites.net/api/Security_Company', obj)
  }
  DeleteSecurity(id) {
    return this.http.delete('https://2019group4inf370.azurewebsites.net/api/Security_Company/' + id)
  }
 

  GetAccess_Levels() {
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Access_Level')
  }
  DeleteAccess_Level(id) {
    return this.http.delete('https://2019group4inf370.azurewebsites.net/api/Access_Level/' + id)
  }
  PostAccess_Level(obj) {
    return this.http.post('https://2019group4inf370.azurewebsites.net/api/Access_Level', obj)
  }
  GetAccess_Level(id) {
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Access_Level/'+id)
  }
  PutAccess_Level(id, obj) {
    return this.http.put('https://2019group4inf370.azurewebsites.net/api/Access_Level/' + id, obj)
  }
  GetMarker_Types() {
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Marker_Type')
  }
  PutMarker_Type(ID, obj) {
    return this.http.put('https://2019group4inf370.azurewebsites.net/api/Marker_Type/' + ID, obj)
  }
  GetMarker_Type(id) {
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Marker_Type/' + id)
  }
  PostMarker_Type(obj){
    return this.http.post('https://2019group4inf370.azurewebsites.net/api/Marker_Type', obj)
  }
  DeleteMarker_Type(id) {
    return this.http.delete('https://2019group4inf370.azurewebsites.net/api/Marker_Type/' + id)
  }
  GetVehicles() {
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Vehicles')
  }
  PutVehicle(ID, obj) {
    return this.http.put('https://2019group4inf370.azurewebsites.net/api/Vehicles/' + ID, obj)
  }
  GetVehicle(id) {
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Vehicles/' + id)
  }
  PostVehicle(obj){
    return this.http.post('https://2019group4inf370.azurewebsites.net/api/Vehicles', obj)
  }
  DeleteVehicle(id) {
    return this.http.delete('https://2019group4inf370.azurewebsites.net/api/Vehicles/' + id)
  }
  GetVehicle_types() {
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Vehicle_Type')
  }
  GetModels() {
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Models')
  }
  GetMakes() {
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Makes')
  }
  getFeedbacks(){
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Feedbacks')
  }
  GetNotifications() {
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Notifications')
  }
  GetBookings() {
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Patrol_Booking')
  }
  PutAsset(ID, obj) {
    return this.http.put('https://2019group4inf370.azurewebsites.net/api/Assets/' + ID, obj)
  }
  GetOneAsset(id) {
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Assets/' + id)
  }
  PostAsset(obj) {
    return this.http.post('https://2019group4inf370.azurewebsites.net/api/Assets', obj)
  }
  DeleteAsset(id) {
    return this.http.delete('https://2019group4inf370.azurewebsites.net/api/Assets/' + id)
  }
  GetSuppliers(id) {
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Suppliers/'+ id)
  }
  GetAssetDropdown() {
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Assets')
}
GetTypeDropdown() {
  return this.http.get('https://2019group4inf370.azurewebsites.net/api/Types')
}
GetSupplierDropdown() {
  return this.http.get('https://2019group4inf370.azurewebsites.net/api/Suppliers')
}
GetStatusDropdown() {
  return this.http.get('https://2019group4inf370.azurewebsites.net/api/Status')
}

  GetUserRole1(id) {
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/User_Role/' + id)
  }
  PostMarker(obj) {
    return this.http.post('https://2019group4inf370.azurewebsites.net/api/Markers', obj)
  }
  DeleteMarker(id) {
    return this.http.delete('https://2019group4inf370.azurewebsites.net/api/Markers/' + id)
  }
  GetMarkers(id) {
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Markers/'+id)
  }
  GetPatrol_log() {
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Patrol_Log')
  }
  PutMarker(ID, obj) {
    return this.http.put('https://2019group4inf370.azurewebsites.net/api/Markers/' + ID, obj)
  }
  GetAssetStatus() {
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Asset_Status')
  }
  PostOrderLine(obj) {
    return this.http.post('https://2019group4inf370.azurewebsites.net/api/Orders/PostOrderL', obj)
  }
  GetHours() {
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Patrol_Log/GetPatrol_LogT')
  }
  GetRoute(){
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Trackings')
  }
  PostAsset_Supplier(obj) {
    this.WriteAudit(sessionStorage.getItem("Ranger"), "Create", "New Supplier added with name "+obj.Name)
    return this.http.post('https://2019group4inf370.azurewebsites.net/api/Assets/AS', obj)
  }
  WriteAudit(Ranger, Type, Description){
    var AD={
      Ranger_ID: Ranger,
      dateTime:new Date(),
      Transaction_Type: Type,
      Critical_data:Description
    }
    console.log(AD)
    return this.http.post('https://2019group4inf370.azurewebsites.net/api/Audits', AD).subscribe(res=>
    {
      console.log(res)
    })
  }
  readAudit(){
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Audits')
  }
  downloadReport()
{
  return this.http.get("https://2019group4inf370.azurewebsites.net/api/Login/Export",{responseType:'blob'});
}
  //   return this.http.post('https://2019group4inf370.azurewebsites.net/api/Audit', AD)
  // }
  GetTimer(id){
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Settings/'+id)
  }
  PutTimer(ID, obj) {
    return this.http.put('https://2019group4inf370.azurewebsites.net/api/Settings/' + ID, obj)
  }
  GetTimers(){
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Settings')
  }
  GetPatrol_logP() {
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Patrol_Log/GetPatrol_LogP')
  }
}
