using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Airballs.API.Helpers
{
	public class GetParameter
	{
		public int Start { get; set; }
		public int PageSize { get; set; }
		public List<FilterModel> Filter { get; set; }
		public List<OrderModel> Order { get; set; }
	}
}
