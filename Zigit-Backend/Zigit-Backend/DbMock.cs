using Zigit_Backend.Models;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace Zigit_Backend
{
    public class DbMock
    {
        //The DB mock data
        private static UserModel[] allwoedUsers = new UserModel[] {
            new UserModel {
                Email = "dvirules@gmail.com",
                Password = "Aa123456",
                Name = "Dvir Chacham",
                Team = "Developers",
                JoinedAt = "14-12-2023",
                Avatar = "\"data:image/jpeg;base64,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\""
            },
            new UserModel { 
                Email = "example@gmail.com",
                Password = "Bb123456",
                Name = "Some Example",
                Team = "Testers",
                JoinedAt = "07-02-2015",
                Avatar = "https://avatarfiles.alphacoders.com/164/thumb-164632.jpg"
            },
            new UserModel {
                Email = "admin@gmail.com",
                Password = "Cc123456",
                Name = "Some Admin",
                Team = "Admins",
                JoinedAt = "01-10-2018",
                Avatar = "https://avatarfiles.alphacoders.com/164/thumb-164632.jpg"
            },
        };

        private static List<Guid> verificationTokens = new List<Guid>();

        private static ProjectModel[] projectsList;

        public DbMock()
        {
            projectsList = DbMock.GetProjectsListFromWeb().Result;
        }
        
        public UserModel[] GetAllowedUsers()
        {
            return allwoedUsers;
        }

        public ProjectModel[] GetProjectsList()
        {
            return projectsList;
        }

        public List<Guid> GetVerificationTokens()
        {
            return verificationTokens;
        }

        public UserModel? GetUserInAllowedListByEmail(string email) // Returns the user by email if its in the allowed list, else returns null.
        {
            foreach(UserModel user in allwoedUsers)
            {
                if (user.Email == email)
                {
                    return user;
                }
            }
            return null;
        }

        public UserModel? GetUserInAllowedListByToken(Guid? token) // Returns the user by token if its in the allowed list, else returns null.
        {
            foreach (UserModel user in allwoedUsers)
            {
                if (user.Token == token)
                {
                    return user;
                }
            }
            return null;
        }

        public bool PasswordVerification(UserModel user, string password)
        {
            return user.Password == password;
        }

        public void AddVerificationToken(Guid token)
        {
            verificationTokens.Add(token);
        }

        private static async Task<ProjectModel[]> GetProjectsListFromWeb() // Gets the list of projects from the mock server and returns it as an array of the ProjectModel class.
        {
            var client = new HttpClient();
            string url = "https://private-052d6-testapi4528.apiary-mock.com/info";
            var response = await client.GetAsync(url);
            var contentString = await response.Content.ReadAsStringAsync();
            Dictionary<string, object>[] contentObjects = JsonSerializer.Deserialize<Dictionary<string, object>[]>(contentString);
            Random random = new Random();

            return contentObjects.Select(obj =>
                new ProjectModel
                {
                    BelongsTo = allwoedUsers[random.Next(0, allwoedUsers.Length)].Email, //Randomly assigns all projects to a random user in the DB.
                    Id = obj.ElementAt(0).Value.ToString(),
                    Name = obj.ElementAt(1).Value.ToString(),
                    Score = Int32.Parse(obj.ElementAt(2).Value.ToString()),
                    DurationInDays = Int32.Parse(obj.ElementAt(3).Value.ToString()),
                    BugsCount = Int32.Parse(obj.ElementAt(4).Value.ToString()),
                    MadeDadeline = Convert.ToBoolean(obj.ElementAt(5).Value.ToString())
                }).ToArray();
        }
    }
}
