using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Zigit_Backend.Models;

namespace Zigit_Backend.Controllers
{
    [ApiController]
    [Route("users/ValidateUser")]
    public class UsersController : ControllerBase
    {
        private static DbMock _db;
        public UsersController(DbMock db)
        {
            _db = db;
        }

        [EnableCors("localhostPolicy")]
        [HttpPost(Name = "ValidateUser")]
        public IActionResult ValidateUser([FromBody] LoginModel loginCredentials) // Post endpoint for user authentication.
        {
            UserModel? user = _db.GetUserInAllowedListByEmail(loginCredentials.Email);

            if (user == null)
            {
                return UnprocessableEntity("Invalid username or password.");
            }

            bool passwordVerified = _db.PasswordVerification(user, loginCredentials.Password);

            if (!passwordVerified)
            {
                return UnprocessableEntity("Invalid username or password.");
            }

            Guid token = Guid.NewGuid(); // Behaves as the verification token. May be replaced with a more advanced verfication method such as JWT.
            _db.AddVerificationToken(token); // Adds the token to the DB for later requests verifications.
            user.Token = token; // Sticks the token to the user

            return Ok(new { token = token, PersonalDetails = new { email = user.Email, name = user.Name, Team = user.Team, joinedAt = user.JoinedAt, avatar = user.Avatar } });
        }
    }
}
