using Microsoft.AspNetCore.Mvc;
using StudyBuddy.Models;
using System.Diagnostics;
namespace StudyBuddy.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult About()
        {
            return View();
        }

        // The main "File Explorer" dashboard
        public IActionResult Hub()
        {
            // These folders represent the "Subjects" in your Botpress Table
            ViewBag.Folders = new List<FolderModel> {
            new FolderModel { Name = "ISM 6225", IconColor = "primary" },
            new FolderModel { Name = "ISM 6419", IconColor = "success" }, 
            new FolderModel { Name = "FIN 6406", IconColor = "danger" },
            new FolderModel { Name = "MAR 6815", IconColor = "warning" },
            new FolderModel { Name = "QMB 6305", IconColor = "purple" }
        };

            // Your demonstration files that don't belong to a specific subject folder
            var unfiled = new List<StudyDocument>{
            new StudyDocument { Name = "Quick_Note.txt", DateAdded = "Apr 9, 2026", Status = "Draft", IconClass = "fa-file-alt text-secondary", BadgeClass = "bg-info" },
            new StudyDocument { Name = "Semester_Schedule.pdf", DateAdded = "Apr 8, 2026", Status = "Reviewed", IconClass = "fa-file-pdf text-danger", BadgeClass = "bg-success" }
        };

            return View(unfiled);
        }

        public IActionResult FolderView(string folderName)
        {
            ViewData["FolderName"] = folderName;

            // This is the C# version of your 20-row Botpress Table
            var allResources = new List<StudyDocument> {
            // ISM 6225
            new StudyDocument { Name = "SQL Join Masterclass.mp4", Subject = "ISM 6225", Status = "Reviewed", DateAdded = "Apr 1, 2026", IconClass = "fa-video", BadgeClass="bg-success" },
            new StudyDocument { Name = "C# Entity Framework Basics.pdf", Subject = "ISM 6225", Status = "Draft", DateAdded = "Apr 2, 2026", IconClass = "fa-file-pdf", BadgeClass="bg-info" },
            new StudyDocument { Name = "MVC Architecture Overview.docx", Subject = "ISM 6225", Status = "In Progress", DateAdded = "Apr 3, 2026", IconClass = "fa-file-word", BadgeClass="bg-warning" },
            new StudyDocument { Name = "Dependency Injection in .NET.mp4", Subject = "ISM 6225", Status = "Reviewed", DateAdded = "Apr 4, 2026", IconClass = "fa-video", BadgeClass="bg-success" },
            new StudyDocument { Name = "Razor Pages vs MVC.pdf", Subject = "ISM 6225", Status = "Draft", DateAdded = "Apr 5, 2026", IconClass = "fa-file-pdf", BadgeClass="bg-info" },

            // ISM 6419
            new StudyDocument { Name = "Data Visualization Guide.pdf", Subject = "ISM 6419", Status = "Reviewed", DateAdded = "Apr 5, 2026", IconClass = "fa-file-pdf", BadgeClass="bg-success" },
            new StudyDocument { Name = "Tableau Level 1 Cert Prep.pdf", Subject = "ISM 6419", Status = "Reviewed", DateAdded = "Apr 6, 2026", IconClass = "fa-file-pdf", BadgeClass="bg-success" },
            new StudyDocument { Name = "Python for Data Science.pdf", Subject = "ISM 6419", Status = "In Progress", DateAdded = "Apr 7, 2026", IconClass = "fa-file-pdf", BadgeClass="bg-warning" },
            new StudyDocument { Name = "Storytelling with Data.mp4", Subject = "ISM 6419", Status = "Reviewed", DateAdded = "Apr 8, 2026", IconClass = "fa-video", BadgeClass="bg-success" },

            // FIN 6406
            new StudyDocument { Name = "Time Value of Money.pdf", Subject = "FIN 6406", Status = "Reviewed", DateAdded = "Apr 1, 2026", IconClass = "fa-file-pdf", BadgeClass="bg-success" },
            new StudyDocument { Name = "Capital Budgeting Case Study.pdf", Subject = "FIN 6406", Status = "Reviewed", DateAdded = "Apr 2, 2026", IconClass = "fa-file-pdf", BadgeClass="bg-success" },
            new StudyDocument { Name = "Risk and Return Analysis.mp4", Subject = "FIN 6406", Status = "In Progress", DateAdded = "Apr 3, 2026", IconClass = "fa-video", BadgeClass="bg-warning" },
            new StudyDocument { Name = "Corporate Valuation Model.pdf", Subject = "FIN 6406", Status = "Reviewed", DateAdded = "Apr 4, 2026", IconClass = "fa-file-pdf", BadgeClass="bg-success" },

            // MAR 6815
            new StudyDocument { Name = "Consumer Behavior Trends.mp4", Subject = "MAR 6815", Status = "Reviewed", DateAdded = "Apr 1, 2026", IconClass = "fa-video", BadgeClass="bg-success" },
            new StudyDocument { Name = "SEO Strategy Blueprint.pdf", Subject = "MAR 6815", Status = "Reviewed", DateAdded = "Apr 2, 2026", IconClass = "fa-file-pdf", BadgeClass="bg-success" },
            new StudyDocument { Name = "Digital Marketing Ethics.pdf", Subject = "MAR 6815", Status = "Draft", DateAdded = "Apr 3, 2026", IconClass = "fa-file-pdf", BadgeClass="bg-info" },

            // QMB 6305
            new StudyDocument { Name = "Linear Regression Notes.pdf", Subject = "QMB 6305", Status = "Reviewed", DateAdded = "Apr 1, 2026", IconClass = "fa-file-pdf", BadgeClass="bg-success" },
            new StudyDocument { Name = "Hypothesis Testing Guide.pdf", Subject = "QMB 6305", Status = "Reviewed", DateAdded = "Apr 2, 2026", IconClass = "fa-file-pdf", BadgeClass="bg-success" },
            new StudyDocument { Name = "Probability Distributions.mp4", Subject = "QMB 6305", Status = "Reviewed", DateAdded = "Apr 3, 2026", IconClass = "fa-video", BadgeClass="bg-success" },
            new StudyDocument { Name = "Web API Authentication.docx", Subject = "ISM 6225", Status = "Reviewed", DateAdded = "Apr 10, 2026", IconClass = "fa-file-word", BadgeClass="bg-success" }
        };

            // Filter documents by the clicked folder name
            var folderFiles = allResources.Where(d =>
            d.Subject == folderName ||
            (folderName != null && folderName.Contains(d.Subject))).ToList();

            return View(folderFiles);
        }

        public IActionResult DocumentView(string name)
        {
            ViewData["DocName"] = name ?? "Lecture_1.pdf";
            return View();
        }

        public IActionResult Analytics()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}