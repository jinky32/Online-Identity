
$(document).ready(function(){

	//application tags for autocomplete
	var acApplications;

	var id = "";
	    var value = "";
	    var label = "";
	    
		// wrapped in { } on line above simply for hiding in ultraedit
	    acApplications = [];

	    $('.app').each(function () {

	        var entry = new Object();
	        entry.id = $(this).attr('id');
	        entry.label = $(this).attr('id');
	        entry.value = $(this).attr('id');
	        acApplications.push(entry);
	    });   
	    
	
	//set up autocomplete
	$( "#search" ).autocomplete({
		minLength: 3,
		source: acApplications,
		focus: function(event, ui) {
			$('#search').val(ui.item.label);
			return false;
		},
    select: function(event, ui) {
      $("#search").val( ui.item.label);
      var idSelected = ui.item.id;
        //$('#int-content').html("<br /><br />" + idSelected);	//todo - update menu to display selected application
      OU.Vantage.MenuManager.SelectApp("#" + idSelected);
      return false;
    }
	});

	$("#search").click(function() {
		$(this).val("");
	});

/*
	//old application structure
	{
			acApplications = [
				"3T Manual Allocation",
				"ADMS Batch Tracking",
				"ADMS Document Production Selection",
				"ADMS Exam Script Tracking",
				"ADMS Item Tracking",
				"ADMS Language Oral Exams Tracking",
				"ADMS Marker Allocation",
				"ADMS Marker Maintenance",
				"ADMS Parameter Maintenance",
				"ADMS Parameter View",
				"ADMS Project Tracking",
				"ADMS Special Exam Request Maintenance",
				"AL Applications",
				"AL CPCM Points Maintenance",
				"AL CVP Params",
				"AL Interviews",
				"AL Staff Search",
				"AVC Enquiry Maintenance",
				"Activity Line Link Maintenance",
				"Activity Line Maintenance",
				"Activity Maintenance",
				"Activity Search",
				"Advert Request Maintenance (PIMS)",
				"Advert Search (Pims)",
				"Advice Referral",
				"Advice Referral Summary - Stud/Corp Contact",
				"Advice Summary - Student/Corporate Contact",
				"Advice and Information",
				"Allocation Factors",
				"Allocation Group Members",
				"Allocation Group Search",
				"Allocation Groups",
				"Allowance Summary (PIMS)",
				"Alternative CPCM Points Maintenance",
				"Amaxis Group Maintenance",
				"Amaxis Group Search",
				"Amaxis Module Maintenance",
				"Amaxis Module Search",
				"Appeals",
				"Application Grade Set Maintenance",
				"Application Search",
				"Application Server DB Connections Maintenance",
				"Applications",
				"Applications Maintenance (PIMS)",
				"Appointment Allowance (PIMS)",
				"Appointment Amendment (PIMS)",
				"Appointment Cancellation (PIMS)",
				"Appointment Dates (PIMS)",
				"Appointment End (PIMS)",
				"Appointment Extension (PIMS)",
				"Appointment Generation (PIMS)",
				"Appointment Location (PIMS)",
				"Appointment Pay Factors",
				"Appointment Search",
				"Appointment Summary (PIMS)",
				"Appointments",
				"Approval of Student Requests",
				"Areas of Disability",
				"Assessment Adjustment and Tags Maintenance",
				"Assessment Copies Print Maintenance",
				"Assessment Job Request",
				"Assessment Late Data Monitoring",
				"Assessment Report Selection",
				"Assessment Special Circumstances Entry",
				"Associate Lecturer Contact Details",
				"Audit Viewer",
				"Authorisation Id Maintenance",
				"Award",
				"Award Activity Line Groups",
				"Award Classification Route",
				"Award Course",
				"Award Course Group Search",
				"Award Course Groups",
				"Award Designation",
				"Award Groups",
				"Award Job Scheduling",
				"Award Level",
				"Award Paths",
				"Awards and Ceremonies Parameters",
				"Bank Branch",
				"Bank Details",
				"Batch Fee Parameter Maintenance",
				"Batch Runs and Reports",
				"Batch Runs and Reports - New",
				"Budget Code Conversion",
				"Budget Code GL Maintenance",
				"Bulk Appointment Acceptance",
				"Bulk Appointment Refusal",
				"Bulk Line Manager Maintenance",
				"Bulk Performance Assessment",
				"Bulk Staff CVP Status/Tutorial Hours",
				"CAR Details",
				"CAR Manager",
				"CAR Message CVP Links",
				"CAR Message Maintenance",
				"CAR Outstanding Batch Summary",
				"CCP Double Marked Task Maintenance",
				"CCP Single Marked Task Maintenance",
				"CDH Demo",
				"AL CDSA Details Maintenance",
				"Tuition Observation",
				"CIRCE Applet Registration",
				"CIRCE Role Registration",
				"CIRCE Template Registration",
				"CIRCE_MI Role Registration",
				"CIRCE_MI Template Registration",
				"CMA Error Records",
				"CMA Level 3 Feedback Parameters",
				"CMA Parameters",
				"CMA Status Maintenance",
				"CTP Details",
				"CTP Manager",
				"CTP Outstanding Batch Summary",
				"CVP Conflation Parameter Maintenance",
				"Conflation Period Details",
				"CVP Conflation Period Maintenance",
				"CVP Despatch Dependency Maintenance",
				"CVP Fees",
				"CVP Registration Groups",
				"CVP Services",
				"CVPs Linked to Non Std Desp Components",
				"Cap a BD Award",
				"Carrier Maintenance",
				"Carrier Postcode",
				"Carry Forward Student Assignment Scores",
				"Catchment Area to Exam Centre Mappings",
				"Catchment Area Defaults Maintenance",
				"Catchment Area Groups",
				"Catchment Areas",
				"Ceremony",
				"Ceremony Guest List",
				"Ceremony Preference Status Summary",
				"Ceremony Waiting List",
				"Certificate Request",
				"Certificate of Sponsorship Maintenance (PIMS)",
				"Change Student Allocation",
				"Claim Check",
				"Claim Details",
				"Claim Summary",
				"Collaborating Establishment Details",
				"Collaborating Establishments",
				"Collaborative Course Results Maintainance",
				"Company",
				"Company Search",
				"Complaints",
				"Completion Profile Maintenance",
				"Conflation Simulation",
				"Contact Maintenance (PIMS)",
				"Copy Allocation Groups",
				"Copy Miscellaneous Recipient CVPs",
				"Corporate Contact",
				"Corporate Contact Search",
				"Corporate Course Details",
				"Corporate Course Reservation",
				"Corporate Discounts",
				"Corporate Discounts Search",
				"Counsellor Links",
				"Country Group Pricing Area",
				"Course",
				"Course Assessment External File Entry",
				"Course Assessment Feedback Control",
				"Course Assessment Outcome Boundary Maintenance",
				"Course Assessment Parameter Maintenance (2008 06)",
				"Course Assessment Parameter Maintenance",
				"Course Assessment Parameter Status View",
				"Course Assessment Template A",
				"Course Assessment Template B",
				"Course Assessment Template C",
				"Course Assessment Template D",
				"Course Assessment Template E",
				"Course Content Details",
				"Course Criteria",
				"Course Exam Session Availability Restrictions",
				"Course Family Group Maintenance",
				"Course Fee Payment",
				"Course Price",
				"Course Regulations",
				"Course Search",
				"Course Summary",
				"Course Sundry Fees",
				"Course Version",
				"Course Version Appointments",
				"Course Version Presentation",
				"Credit Transfer Award",
				"Credit Transfer Claim",
				"Credit Transfer Claim Activity",
				"Criminal Record Check",
				"DRT Appointment Details Release",
				"Data Class Builder",
				"Database Registration",
				"Database Registration",
				"Delivery Instructions Maintenance",
				"Delphi Department Maintenance",
				"Despatch Confirmation",
				"Despatch Details",
				"Despatch Notes",
				"Despatch Output Print",
				"Despatch Output Reprint",
				"Despatch Request",
				"Despatch Summary",
				"Disabilities and Add Req's Facilities",
				"Disabilities and Add Req's Facility Search",
				"Disabilities and Add Req's Facility Type",
				"Discipline Applications",
				"Discipline and Academic Units",
				"Document Despatch",
				"Document Mailing Maintenance",
				"Document Print Diversion",
				"EAB AG Mark Maintenance",
				"ECA Guideline Maintenance",
				"ECA Parameter Maintenance",
				"EDS Document Code Maintenance",
				"EDS Document Details Maintenance",
				"ENA Parameter Maintenance",
				"ETMA Parameter Maintenance",
				"Enquiry",
				"Enquiry History",
				"Enquiry Maintenance (PIMS)",
				"Enrol Document Messages Maintenance",
				"Enrol Documents Requests",
				"Entitlement Maintenance",
				"Event Maintenance",
				"Event Room Bookings",
				"Event Search",
				"Event Staff Maintenance",
				"Event Timetable Search",
				"Event Timetable Summary",
				"Exam CV Session Maintenance",
				"Exam Centre Details",
				"Exam Centre Session Maintenance",
				"Exam Copies Print Maintenance",
				"Exam Schedule Control",
				"Exam Schedule File Viewer",
				"Exam Schedule Request",
				"Exam Schedule Viewer",
				"Exam Session Details",
				"Exam Summary",
				"Exam Timetable Basic Details",
				"Exam Timetable Course Groups",
				"Exam Timetable Manual Adjustment",
				"Exam Timetable Production Control",
				"Exam Timetable Special Schedule",
				"Exams",
				"Exception Confirmation and Reprint",
				"Extensions",
				"Eye Care Voucher Maintenance",
				"Fast Input Enquiry",
				"Fee Calculation",
				"Fee Parameters",
				"Financial Support Applications",
				"Financial Support Budgets",
				"Fix/Notify Allocation Groups",
				"Geographical Criteria",
				"Grant Claims",
				"Grant Parameters",
				"Grant Payments",
				"Grant Rates",
				"Grants",
				"Guideline Status Set Maintenance",
				"Hesa Control Lists",
				"Hesa Maintenance (PIMS)",
				"Hesa Parameters",
				"Hesa Return Contract (PIMS)",
				"Hesa Return Person (PIMS)",
				"Hesa Returns (PIMS)",
				"Hesa Student Details",
				"Historic Despatches",
				"Historic Results Maintenance",
				"Hubs and Clusters",
				"IRD Review",
				"In Tray (PIMS)",
				"Infrastructure Id Maintenance",
				"Institutional Mailings",
				"Interview Maintenance (PIMS)",
				"Invitation To Apply",
				"Invitation To Apply Search",
				"Invoice Address Search",
				"Invoice Addresses",
				"Job Code Maintenance (PIMS)",
				"Mailing CVP Status Change",
				"Mailing Criteria Maintenance",
				"Mailing Pack Maintenance",
				"Mailing Progress",
				"Mailing Search",
				"Maintain Credit Transfer Claim Type",
				"Maintain Credit Transfer Subject",
				"Maintain Hosts",
				"Maintain Ingres Permissions",
				"Maintain LocnCombinations",
				"Maintain Machine Accounts",
				"Maintain SQL Server Permissions",
				"Maintain Nation and Transitional Fee Status",
				"Maintain User Accounts",
				"Maintain User Remit Profile (PIMS)",
				"Manifest Create",
				"Manifest Preview",
				"Manual Allocation",
				"Manual Fee Waivers",
				"Manual Student Exam Centre Allocation (New)",
				"Manual Student Exam Centre Allocation",
				"Medical Codes Maintenance",
				"Medical Conditions Maintenance",
				"Medical Event Maintenance",
				"Medical Loans Maintenance",
				"Membership Maintenance",
				"Message Code Maintenance",
				"Message Details",
				"Miscellaneous Fees",
				"Miscellaneous Recipient Details",
				"Module Life Change",
				"Monitor Your Advice Items",
				"MSE AL Contact Details",
				"MSE AL Staff Search",
				"MSE Event Room Bookings",
				"MSE Event Search",
				"MSE Event Timetable Search",
				"MSE Public Holiday Maintenance",
				"MSE Tutor Events Summary",
				"MSE Venue Contact Details",
				"MSE Venue Facility Details",
				"MSE Venue Maintenance",
				"MSE Venue Room Details",
				"MSE Venue Room Maintenance",
				"MSE Venue Room Summary",
				"MSE Venue Search",
				"Multiple Student Reallocation",
				"New Refunds",
				"New Student Reservation",
				"New TMA Parameters",
				"Nominal Code Maintenance",
				"Non Course Based Fees",
				"Non Standard Despatch Requests",
				"Non Std Desp Components",
				"Non Std Desp Components Linked to CVPs",
				"OU Computer User Search",
				"Offer Maintenance (PIMS)",
				"Outstanding Grant Claims",
				"Outstanding Requests",
				"PI Merge",
				"PIMS SQL Submission",
				"PLANET Transfers",
				"Parameter Table Maintenance",
				"Partner Course Groups Maintenance",
				"Partner Institution Maintenance",
				"Pause Course Reservation",
				"Pay Enquiry",
				"Pay Factor Maintenance",
				"Payment Authorisation",
				"Payroll Switch",
				"Pending View",
				"Pension Scheme Transfers",
				"Pension Statement Query",
				"Performance Assessment",
				"Permanent\Fixed Status Maintenance (PIMS)",
				"Posy Category Keyword Maintenance",
				"Posy Coded Remark Maintenance",
				"Posy Item Maintenance",
				"Posy MI (NEW)",
				"Posy MI",
				"Posy Operator Maintenance",
				"Posy Order Number Maintenance",
				"Posy Purchase Orders",
				"Posy Recover Transferred Orders",
				"Posy Remark Link Maintenance",
				"Posy Supplier Maintenance",
				"Posy Vat Maintenance",
				"Presentation Carry Forward",
				"Presentation Transfer",
				"Presentation Transfer Maintenance",
				"Print Manager",
				"Print Monitor",
				"Print Requests",
				"Probation",
				"Probation Maintenance (PIMS)",
				"Processing Group Maintenance",
				"Progress and Probation",
				"Public Holiday Mtce",
				"Publication",
				"Publication Search",
				"Query Payments",
				"Quick Address Lookup",
				"Quota Maintenance",
				"Recall Manager",
				"Record Ceremony Attendance",
				"Recruitment Organisation Maintenance (PIMS)",
				"Reference Maintenance (PIMS)",
				"Refund Authorisation",
				"Refunds",
				"Remove Reregistration Requests",
				"Request Batch Mailing",
				"Request Credit Transfer Claim Form",
				"Request Enquiry Letters",
				"Retirement Dates (PIMS)",
				"Role Codes Maintenance (PIMS)",
				"Role Maintenance",
				"Role Pay Maintenance",
				"SAMPOP1",
				"SAMPOP2",
				"SAMPOP3",
				"SAMS Error Maintenance",
				"SAMS OUCU Person Id Link Maintenance",
				"SAMS Service Maintenance",
				"SAMS Service Relationship Maintenance",
				"SAMS Service Search",
				"SAMS Service Selection",
				"SAMS Service VLE Integration",
				"SAMS User Service Maintenance",
				"SAMS User Service Selection",
				"SCF Actual Costs Per Account",
				"SCF Appointment Account",
				"SCF Assign Actual Costs",
				"SCF Costing Appointment Account",
				"SCF Costing Forecast",
				"SCF Create Forecast Budget",
				"SCF Forecast Balance",
				"SCF Forecast Run Results",
				"SCF Forecast Run Selection",
				"SCF Inflation Rate",
				"SCF Maintain Allocation of Costs",
				"SCF Maintain Individuals Details",
				"SCF Maintain Parameters",
				"SCF Manipulate Forecast Budget",
				"SCF National Insurance Scale",
				"SCF Non Standard Forecast",
				"SCF Non-Standard Inflation Rate",
				"SCF Non-Standard Pension Rate",
				"SCF Option Screen",
				"SCF Pension Rate",
				"SCF Select Appointment Account",
				"SCF Select For Output Report",
				"SCF Select Inflation Rate",
				"SCF Select National Insurance Scale",
				"SCF Select Pension Rate",
				"SCF Standard Forecast",
				"SEPs and ARCs",
				"SLC FA Academic Year Maintenance",
				"SLC FA Eligible Awards Maintenance",
				"SLC Student Loans",
				"SRNEW Course",
				"SRNEW Course Pres",
				"Salary History (PIMS)",
				"Sanctions Inhibit List Maintenance",
				"Score Scale Maintenance",
				"Search Application",
				"Selection Monitor",
				"Selection Summary (PIMS)",
				"Service Registration",
				"Session Appointment Summary",
				"Session Attendance",
				"Source of Interest",
				"Source of Interest Search",
				"Special Skills Maintenance",
				"Special Skills Search",
				"Sponsor Invoice Selection",
				"Sponsoring Establishment Details",
				"Sponsoring Establishments",
				"Sponsorship Agreement",
				"Staff Casual Worker Maintenance",
				"Staff DAR Profile Text",
				"Staff Details (Research Degrees)",
				"Staff Development Participation",
				"Staff Development Summary",
				"Staff Development Type Maintenance",
				"Staff Disabilities",
				"Staff Enquiry",
				"Staff Enquiry History",
				"Staff Groups",
				"Staff Links",
				"Staff Maintenance (PIMS)",
				"Staff Maintenance",
				"Staff Manual RCS Requests",
				"Staff Monitoring Grade Set Maintenance",
				"Staff Payments",
				"Staff Per Students",
				"Staff Search (CIRCE)",
				"Staff Search (PIMS)",
				"Staff Selections and Labels",
				"Staff Special Skills",
				"Statements of Academic Record",
				"Student",
				"Student Academic Progress",
				"Student Activity Line Details",
				"Student Activity Line Summary",
				"Student Additional Fees Support",
				"Student Advice",
				"Student Allocation",
				"Student Assessment Score Simulation",
				"Student Assignment Details (New)",
				"Student Assignment Details",
				"Student Attendance",
				"Student Award Acceptance",
				"Student Award Completion Messages",
				"Student Award Designation Maintenance",
				"Student Award Level Course Maintenance",
				"Student Award Level History",
				"Student Award Level Maintenance",
				"Student Award Maintenance",
				"Student Award Progress Check",
				"Student Award Used Course Maintenance",
				"Student Ceremony",
				"Student Ceremony Allocation History",
				"Student Certificate Names",
				"Student Conflation Simulation",
				"Student Course Award History",
				"Student Course Details",
				"Student Course Fee Adjustment",
				"Student Course Outcome Exceptions",
				"Student Course Outcome Maintenance",
				"Student Course Result Maintenance",
				"Student Course Result Summary",
				"Student Course Search",
				"Student Course Status Change",
				"Student Course Status History",
				"Student Course Summary",
				"Student DAR Profile Text",
				"Student Details (Research Degrees)",
				"Student Disabilities",
				"Student Disabilities and Add Req's Requests",
				"Student Duplicate Search",
				"Student ECA Deferral",
				"Student ECMA Maintenance",
				"Student Excusals And Surrenders",
				"Student Fee Grant Allocation Status History",
				"Student Fees Summary",
				"Student Grant Assessment",
				"Student Grant Claims History",
				"Student Grant Entitlements",
				"Student Home Exam Parameters",
				"Student Loans",
				"Student Module Late Data Snapshots",
				"Student Outcome EAB Overrides",
				"Student Outcome Version Changes View",
				"Student Payments",
				"Student Pending Maintenance",
				"Student Preference Capture",
				"Student Qualification Maintenance",
				"Student Search",
				"Student Subordinate Awards",
				"Student Supplementary Details",
				"Student TMA Extensions",
				"Student Task Mark Maintenance",
				"Students On Corporate Reservation",
				"Students per Staff",
				"Study Event Maintenance",
				"Study Event Search",
				"Supplementary Details Template",
				"Suspensions",
				"THD Supplementary Information",
				"TMA Parameters",
				"TMA Payment Factors",
				"TMA Std Fee and Expense Payment Rates",
				"TSA Course Parameters",
				"TSA Presentation Signoff",
				"TSA RS Course Criteria",
				"TSA Related DARF",
				"Temporary Address Maintenance",
				"Thesis Details",
				"Transfer Staff between Units",
				"Trigger Pay",
				"Tutor Events Summary",
				"Tutor History",
				"Unified Staff Record Enquiry",
				"Unit Maintenance (PIMS)",
				"Unit Relationship Maintenance (PIMS)",
				"Unit Search (PIMS)",
				"User Creation and Maintenance",
				"User Name Search",
				"User Service Registration",
				"VLE Cluster Group Maintenance",
				"VLE Cluster Group Search",
				"VLE Data Integration",
				"VLE Data Integration Activities",
				"Vacancy Maintenance (PIMS)",
				"Vacancy Search (PIMS)",
				"Vacancy Search",
				"Vaccinations Maintenance",
				"Venue Contact Details",
				"Venue Facility Details",
				"Venue Maintenance",
				"Venue Room Details",
				"Venue Room Maintenance",
				"Venue Room Summary",
				"Venue Search",
				"View Drip Tray",
				"View Selected Recipients",
				"WIMS BOM Parameters",
				"WIMS Forecast Data Maintenance",
				"WIMS Stock Disposals",
				"Web Enquiry Category Search",
				"Web Enquiry Generic Publications",
				"Web Enquiry Publication Links",
				"Work Permit Info Maintenance (PIMS)",
				"Your Outstanding Advice Referrals"
			];
	}
*/

});