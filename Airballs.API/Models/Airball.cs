using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Airballs.API.Models
{
	public class Airball
	{
		[Key]
		public int Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public string ColorCode { get; set; }
		public virtual Color Color { get; set; }
		public decimal Price { get; set; }
		public int Quantity { get; set; }
	}

}
