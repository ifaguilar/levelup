import { countProductsByBrand } from "../api/product";
import { countEmployeesByGender } from "../api/employee";

const analyticsLoader = async () => {
  try {
    const { productCountByBrand } = await countProductsByBrand();
    const { employeeCountByGender } = await countEmployeesByGender();

    return {
      productCountByBrand: productCountByBrand,
      employeeCountByGender: employeeCountByGender,
    };
  } catch (error) {
    return { productCountByBrand: [], employeeCountByGender: [] };
  }
};

export default analyticsLoader;
