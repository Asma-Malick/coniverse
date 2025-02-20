// Sample job data for demonstration
const jobs = [
  {
      role: "Software Engineer",
      company: "TechCorp",
      type: "Full-time",
      workType: "Hybrid",
      description: "Join our dynamic team as a Software Engineer to work on cutting-edge projects in the tech industry.",
  },
  {
      role: "Marketing Intern",
      company: "BizWorld",
      type: "Internship",
      workType: "Remote",
      description: "Help us develop marketing strategies and grow our brand. A great opportunity for freshers.",
  },
  {
      role: "Product Manager",
      company: "Innova Solutions",
      type: "Full-time",
      workType: "Hybrid",
      description: "Lead a team of developers and designers in building new innovative products.",
  }
];

// Display job listings dynamically
const jobListingsContainer = document.getElementById('job-listings');

jobs.forEach((job, index) => {
  const jobCard = document.createElement('div');
  jobCard.classList.add('col-md-4');
  jobCard.innerHTML = `
      <div class="job-card">
          <h4>${job.role}</h4>
          <p><strong>Company:</strong> ${job.company}</p>
          <p><strong>Type:</strong> ${job.type}</p>
          <p><strong>Work Type:</strong> ${job.workType}</p>
          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#jobModal" data-job-index="${index}">View Details</button>
      </div>
  `;
  jobListingsContainer.appendChild(jobCard);
});

// Handle job details modal
document.addEventListener('click', function(event) {
  if (event.target && event.target.dataset.jobIndex) {
      const jobIndex = event.target.dataset.jobIndex;
      const job = jobs[jobIndex];
      
      document.getElementById('role-name').innerText = job.role;
      document.getElementById('company-name').innerText = "Company: " + job.company;
      document.getElementById('job-type').innerText = "Type: " + job.type;
      document.getElementById('work-type').innerText = "Work Type: " + job.workType;
      document.getElementById('job-description').innerText = job.description;
      
      // Show the Apply Now button
      document.getElementById('apply-now-btn').onclick = function() {
          $('#jobModal').modal('hide');
          $('#applyModal').modal('show');
      };
  }
});

// Handle job application form submission
document.getElementById('applyForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('applicant-name').value;
  const phone = document.getElementById('applicant-phone').value;
  const email = document.getElementById('applicant-email').value;
  const resume = document.getElementById('resume').files[0];

  if (!name || !phone || !email || !resume) {
      alert("Please fill all the details.");
      return;
  }

  // Simulate successful application submission
  document.getElementById('success-message').style.display = 'block';
  setTimeout(() => {
      $('#applyModal').modal('hide');
  }, 2000);
});
