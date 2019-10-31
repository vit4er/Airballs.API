using Airballs.API.Helpers;
using Airballs.API.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Airballs.API.Data
{
	public static class AirballsRepository
	{
		/// <summary>
		/// Упорядочивание воздушных шариков по
		/// специфичным для наших воздушных шариков полям
		/// </summary>
		/// <param name="queryable">Источник</param>
		/// <param name="orderList"></param>
		/// <returns></returns>
		public static IQueryable<Airball> SetOrder(this IQueryable<Airball> queryable, List<OrderModel> orderList)
		{
			if (orderList == null || orderList.Count == 0) return queryable;
			for (int i = 0; i < orderList.Count; i++)
			{
				switch (orderList[i].Field)
				{
					case "id":
						{
							if (orderList[i].Order == 1)
							{
								queryable = queryable.OrderBy(x => x.Id);
							}
							if (orderList[i].Order == -1)
							{
								queryable = queryable.OrderByDescending(x => x.Id);
							}
						}
						break;
					case "name":
						{
							if (orderList[i].Order == 1)
							{
								queryable = queryable.OrderBy(x => x.Name);
							}
							if (orderList[i].Order == -1)
							{
								queryable = queryable.OrderByDescending(x => x.Name);
							}
						}
						break;
					case "colorCode":
						{
							if (orderList[i].Order == 1)
							{
								queryable = queryable.OrderBy(x => x.ColorCode);
							}
							if (orderList[i].Order == -1)
							{
								queryable = queryable.OrderByDescending(x => x.ColorCode);
							}
						}
						break;
					case "quantity":
						{
							if (orderList[i].Order == 1)
							{
								queryable = queryable.OrderBy(x => x.Quantity);
							}
							if (orderList[i].Order == -1)
							{
								queryable = queryable.OrderByDescending(x => x.Quantity);
							}
						}
						break;
					case "price":
						{
							if (orderList[i].Order == 1)
							{
								queryable = queryable.OrderBy(x => x.Price);
							}
							if (orderList[i].Order == -1)
							{
								queryable = queryable.OrderByDescending(x => x.Price);
							}
						}
						break;
				}
			}
			return queryable;
		}

		/// <summary>
		/// Фильтр для каждого поля индивидуальный,
		/// в зависимости от типа поля и контекста в классе,
		/// напр: целое как номер выигрышного билета должно совпадать точно,
		/// а как количество билетов может быть равно, больше, меньше.
		/// </summary>
		/// <param name="queryable"></param>
		/// <param name="filterList"></param>
		/// <returns></returns>
		public static IQueryable<Airball> SetFilter(this IQueryable<Airball> queryable,
			JObject filterJson)
		{
			try
			{
				if (filterJson.Root.HasValues == false) return queryable;
				if (filterJson["colorCode"] != null && filterJson["colorCode"].HasValues)
				{
					if (filterJson["colorCode"]["matchMode"].ToString() == "in")
					{
						JArray vals = (JArray)filterJson["colorCode"]["value"];
						string[] colors = vals.Select(x => (string)x).ToArray();
						queryable = queryable.Where(x => colors.Contains(x.ColorCode));
					}
				}
				if(filterJson["name"] != null && filterJson["name"].HasValues)
				{
					if (filterJson["name"]["matchMode"].ToString() == "contains")
					{
						string substr = filterJson["name"]["value"].ToString();
						queryable = queryable.Where(x => x.Name.Contains(substr));
					}
				}

				return queryable;
			}
			catch (Exception ex)
			{
				throw ex;
			}
		}
	}
}
