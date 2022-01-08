using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Tourney_Tracker.DataAccess;
using Tourney_Tracker.Models;

namespace Tourney_Tracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParticipantController : ControllerBase
    {
        ParticipantRepository _repo;
        LeagueRepository _repo2;
        public ParticipantController(ParticipantRepository repo, LeagueRepository repo2)
        {
            _repo = repo;
            _repo2 = repo2;
        }

        // Get Participants by LeagueId //
        [HttpGet("league/{leagueId}")]
        public IActionResult GetParticipantsByLeagueId(int leagueId)
        {
            _repo2.CalculateLeagueElo(leagueId);

            var participants = _repo.SelectParticipantsByLeagueId(leagueId);

            if (participants == null)
            {
                return NotFound($"No Participants with the LeagueId of {leagueId} were found.");
            }

            return Ok(participants);
        }

        // Get Participant by Id //
        [HttpGet("{id}")]
        public IActionResult GetParticipantById(int id)
        {
            return Ok(_repo.SelectParticipantById(id));
        }

        // Add Participants //
        [HttpPost]
        public IActionResult PostParticipant(Participant newParticipant)
        {
            int leagueElo = _repo.SelectLeagueById(newParticipant.LeagueId);

            newParticipant.Elo = leagueElo;

            return Ok(_repo.InsertParticipant(newParticipant));
        }

        // Delete Participant //
        [HttpDelete("{id}")]
        public IActionResult DeleteParticipant(int id)
        {
            _repo.DeleteParticipantById(id);
            return Ok("You have successfully deleted this Participant from the Database.");
        }

        // Update Participant //
        [HttpPut]
        public IActionResult PutParticipant(int id, Participant participant)
        {
            var participantToUpdate = _repo.SelectParticipantById(id);

            if (participantToUpdate == null)
            {
                return NotFound($"The Participant associated with the Id of {id} could not be located ");
            }

            return Ok(_repo.UpdateParticipantById(id, participant));
        }
    }
}
