namespace Zigit_Backend.Models
{
    public class UserModel
    {
        public Guid? Token { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public string Name { get; set; }

        public string Team { get; set; }

        public string JoinedAt { get; set; }

        public string Avatar { get; set; }
    }
}
