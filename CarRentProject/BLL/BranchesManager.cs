using BOL;
using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public static class BranchesManager
    {
        public static BranchModel[] SelectAllBranches()
        {
            try
            {
                using (CarRentDBEntities ef = new CarRentDBEntities())
                {

                    return ef.Branches.Select(dbBranch => new BranchModel
                    {
                       Adrress=dbBranch.Adrress,
                       BranchId=dbBranch.BranchId,
                       BranchName=dbBranch.BranchName,
                       Latitude=dbBranch.Latitude,
                       Longitude=dbBranch.Longitude
                    }).ToArray();

                }
            }
            catch (Exception)
            {
                return null;
            }
        }

    }
}
