using Microsoft.AspNetCore.Mvc;
using StudyBuddy.Models;
using System.Diagnostics;
using StudyBuddy.Models;
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
            var unfiled = new List<StudyDocument>{
                new StudyDocument { Name = "Quick_Note.txt", DateAdded = "Apr 9, 2026", Status = "Draft", IconClass = "fa-file-alt text-secondary", BadgeClass = "bg-info" }
            };
            return View(unfiled);
        }

        public IActionResult FolderView(string id)
        {
            ViewData["FolderName"] = id;

            // Simulate folder-specific data
            var folderFiles = new List<StudyDocument>
            {
                new StudyDocument { Name = "Syllabus.pdf", DateAdded = "Apr 5, 2026", Status = "Reviewed", IconClass = "fa-file-pdf text-danger", BadgeClass = "bg-success" },
                new StudyDocument { Name = "Lecture_1.pptx", DateAdded = "Apr 7, 2026", Status = "In Progress", IconClass = "fa-file-powerpoint text-warning", BadgeClass = "bg-warning" }
            };
            return View(folderFiles);
        }

        public IActionResult DocumentView(string name)
        {
            ViewData["DocName"] = name ?? "Lecture_1.pdf";
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}