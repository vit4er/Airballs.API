using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Airballs.API.Data;
using Airballs.API.Models;
using Airballs.API.Helpers;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Airballs.API.Controllers
{
    [Route("api/airball")]
    [ApiController]
    public class AirballController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AirballController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Airball
        [HttpGet]
        public async Task<object> GetAirballs(
			int start,
			int length=5,
			string orders="",
			string filters="")
        {
			try
			{
				//var query = await _context.Airballs.AsQueryable().ToListAsync();
				List<OrderModel> Orders = new List<OrderModel>();
				JObject filterJson = JObject.Parse(filters);

				//if (!string.IsNullOrWhiteSpace(filters))
				//{
				//	filterJson = JObject.Parse(filters);
				//}

				if (string.IsNullOrWhiteSpace(orders))
				{
					Orders = null;
				}
				else
				{
					Orders = JsonConvert.DeserializeObject<List<OrderModel>>(orders);
				}

				var queryResult = _context.Airballs.Include(x => x.Color).Where(x => x.ColorCode == x.Color.Code);

				/// Фильтруем
				/// 
				var filteredResult = queryResult.SetFilter(filterJson);
				/// Сортируем
				var orderedResult = filteredResult.SetOrder(Orders);
				/// Считаем
				int? total = await filteredResult.CountAsync();
				/// Шинкуем
				var pagedResult = orderedResult.Page(start, length);

				return new
				{
					start,
					length,
					total = total ?? 0,
					query = pagedResult
				};
			}
			catch (Exception ex)
			{
				throw ex;
			}
		}

		// GET: api/Airball/5
		[HttpGet("{id}")]
        public async Task<ActionResult<Airball>> GetAirball(int id)
        {
            var airball = await _context.Airballs.FindAsync(id);

            if (airball == null)
            {
                return NotFound();
            }

            return airball;
        }

        // PUT: api/Airball/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAirball(int id, Airball airball)
        {
            if (id != airball.Id)
            {
                return BadRequest();
            }

            _context.Entry(airball).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AirballExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Airball
        [HttpPost]
        public async Task<ActionResult<Airball>> PostAirball(Airball airball)
        {
			try
			{
				var i = _context.Airballs.Add(airball);
				await _context.SaveChangesAsync();
				return CreatedAtAction("GetAirball", new { id = airball.Id }, airball);
			}
			catch (Exception ex)
			{
				throw ex;
			}
        }

        // DELETE: api/Airball/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Airball>> DeleteAirball(int id)
        {
            var airball = await _context.Airballs.FindAsync(id);
            if (airball == null)
            {
                return NotFound();
            }

            _context.Airballs.Remove(airball);
            await _context.SaveChangesAsync();

            return airball;
        }

        private bool AirballExists(int id)
        {
            return _context.Airballs.Any(e => e.Id == id);
        }

	}
}
