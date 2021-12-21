using Microsoft.AspNetCore.Mvc;
using Tourney_Tracker.DataAccess;
using Tourney_Tracker.Models;

namespace Tourney_Tracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeagueController : ControllerBase
    {
        LeagueRepository _repo;
        public LeagueController(LeagueRepository repo)
        {
            _repo = repo;
        }

        // Get Leagues by OwnerId //
        [HttpGet("owner/{ownerId}")]
        public IActionResult GetLeaguesByOwnerId(string ownerId)
        {
            var leagues = _repo.SelectUserLeagues(ownerId);

            if (leagues == null)
            {
                return NotFound($"No Leagues with the OwnerId of {ownerId} were found.");
            }

            return Ok(leagues);
        }

        // Get League by Id //
        [HttpGet("{id}")]
        public IActionResult GetLeague(int id)
        {
            var league = _repo.SelectLeagueById(id);

            if (league == null)
            {
                return NotFound($"No League with the Id of {id} was found.");
            }

            return Ok(league);
        }

        // Get Public Leagues //
        [HttpGet]
        public IActionResult GetPublicLeagues()
        {
            var publicLeagues = _repo.SelectPublicLeagues();

            if (publicLeagues == null)
            {
                return NotFound($"No public Leagues were found.");
            }

            return Ok(publicLeagues);
        }

        // Add League //
        [HttpPost]
        public IActionResult PostLeague(League newLeague)
        {
            return Ok(_repo.InsertLeague(newLeague));
        }

        // Delete League //
        [HttpDelete]
        public IActionResult DeleteLeague(int id)
        {
            _repo.DeleteLeagueById(id);
            return Ok("You have successfully deleted this League from the Database.");
        }

        // Update League //
        [HttpPut]
        public IActionResult PutLeague(int id, League league)
        {
            var leagueToUpdate = _repo.SelectLeagueById(id);

            if (leagueToUpdate == null)
            {
                return NotFound($"The League associated with the Id of {id} could not be located ");
            }

            return Ok(_repo.UpdateLeagueById(id, league));
        }
    }
}
