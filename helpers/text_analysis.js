//NOTE : train classifier for
// var trainMeBro = () => {
var resumeArray = require('../seed.js');
var natural = require('natural');
classifier = new natural.BayesClassifier();

// EXPORT ALL OF THIS AS A FUNCTION

   var run =  function() {
      resumeArray.forEach(function(value, index, array) {
         classifier.addDocument(value.summary.jobtitle, value.experience.jobdescription);
         console.log(index + " documents have been trained");
      });
      classifier.train();

      console.log("Should Return 'Computer Programmer'");
      var classified = classifier.classify("I Managed the clinic's level 2 support queue focusing on improving customer satisfaction ratings and decreasing ticket resolution times. Resolved escalated desktop and connectivity issues. Configured, installed, and supported Cisco Phones using Cisco Call Manager. Repaired networked printers and fax machines. Installed new desktops, laptops, and other hardware/software. Implemented a new imaging process using Clonezilla and F.O.G. to increase productivity and streamline workstation configuration. Developed custom software to automate common system tasks. Managed workstations on the clinic domain using Active Directory. Configured virtual environments prior to product release to test load balancing and functionality of software introduced into our work environment. Utilized VMware vSphere client to monitor and troubleshoot clinic virtual servers. Tracked network inventory and initiated new hardware orders. Received and worked my case load using Kayako Fusion case management software.");

      return classified[0];
   }

   debugger;
