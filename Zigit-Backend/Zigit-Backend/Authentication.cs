using Microsoft.AspNetCore.Mvc;

namespace Zigit_Backend
{
    public class Authentication
    {
        private static DbMock _db;

        public Authentication(DbMock db)
        {
            _db = db;
        }

        public Guid? VerifyTokenBearer(string token) // Searches for the Guid bearer token from the request in the DB.
        {
            token = token.Substring("Bearer ".Length).Trim();
            Guid returnToken = Guid.Parse(token);
            if ( _db.GetVerificationTokens().Contains(returnToken))
            {
                return returnToken;
            }
            return null;
        }
    }
}
