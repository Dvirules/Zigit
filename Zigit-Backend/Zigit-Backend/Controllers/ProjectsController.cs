using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Zigit_Backend.Models;

namespace Zigit_Backend.Controllers
{
    [ApiController]
    [Route("projects/getlist")]
    public class ProjectsController : ControllerBase
    {
        private static DbMock _db;
        private static Authentication _authenticator;
        public ProjectsController(DbMock db, Authentication authernticator)
        {
            _db = db;
            _authenticator = authernticator;
        }

        [EnableCors("localhostPolicy")]
        [HttpGet(Name = "getlist")]
        public IActionResult GetProjectsList([FromHeader(Name = "Authorization")] string token)
        {
            Guid? userToken = _authenticator.VerifyTokenBearer(token);
            if (userToken == null)
            {
                return Unauthorized("Unauthorized");
            }
            UserModel user = _db.GetUserInAllowedListByToken(userToken);
            return Ok(_db.GetProjectsList().Where(project => project.BelongsTo == user.Email)); // Returns only the projects that are assigned to the specific user.
        }
    }
}
