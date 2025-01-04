import { useNavigate, useSearchParams } from 'react-router-dom';
import Card from './Card';
import { useState } from 'react';
import makeSlug from '../hooks/makeSlug';

export default function Filter({ products, sort }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const brandsArray = [...new Set(products?.map((product) => product.brand))];
  const modelsArray = [...new Set(products?.map((product) => product.model))];

  const [filteredData, setFilteredData] = useState({
    brands: makeSlug(brandsArray),
    models: makeSlug(modelsArray),
  });

  const handleSortChange = (event) => {
    const { value } = event.target;
    setSearchParams((params) => {
      params.set('sort', value);
      return params;
    });
  };

  const handleCheckboxChange = (event, type) => {
    const { value, checked } = event.target;
    let array = searchParams.get(type)?.split(',') || [];
    if (checked && !array.includes(value)) array.push(value);
    else array = array.filter((item) => item !== value);

    setSearchParams((searchParams) => {
      if (array.length == 0) searchParams.delete(type);
      else searchParams.set(type, array.join(','));
      return searchParams;
    });
  };

  const handleSearch = (event, type) => {
    const { value } = event.target;
    const arr = type === 'brands' ? brandsArray : modelsArray;
    const filtered = makeSlug(arr).filter((f) => {
      return f.value.toLowerCase().includes(value.toLowerCase());
    });
    setFilteredData((f) => ({ ...f, [type]: filtered }));
  };

  return (
    <section id='filter_area'>
      <Card title='Sort By'>
        {sort.map((s) => (
          <div className='flex items-center gap-2' key={`sort_${s.key}`}>
            <input
              onChange={handleSortChange}
              type='radio'
              name='sort'
              value={s.key}
              defaultChecked={searchParams.get('sort') == s.key}
              id={s.key}
            />
            <label htmlFor={s.key}>{s.value}</label>
          </div>
        ))}
      </Card>

      <Card title='Brands'>
        <input
          type='text'
          className='px-1 py-2 mb-2 rounded-md bg-slate-200 w-[100%]'
          placeholder='Search..'
          onChange={(e) => handleSearch(e, 'brands')}
        />
        {filteredData.brands.map((brand) => (
          <div className='flex items-center gap-2' key={`brand_${brand.key}`}>
            <input
              onChange={(e) => handleCheckboxChange(e, 'brands')}
              type='checkbox'
              name='brands'
              value={brand.key}
              defaultChecked={searchParams
                .get('brands')
                ?.split(',')
                .includes(brand.key)}
              id={brand.key}
            />
            <label htmlFor={brand.key}>{brand.value}</label>
          </div>
        ))}
      </Card>

      <Card title='Models'>
        <input
          type='text'
          className='px-1 py-2 mb-2 rounded-md bg-slate-200 w-[100%]'
          placeholder='Search..'
          onChange={(e) => handleSearch(e, 'models')}
        />
        {filteredData.models.map((model) => (
          <div className='flex items-center gap-2' key={`model_${model.key}`}>
            <input
              onChange={(e) => handleCheckboxChange(e, 'models')}
              type='checkbox'
              name='brands'
              value={model.key}
              defaultChecked={searchParams
                .get('models')
                ?.split(',')
                .includes(model.key)}
              id={model.key}
            />
            <label htmlFor={model.key}>{model.value}</label>
          </div>
        ))}
      </Card>
    </section>
  );
}
