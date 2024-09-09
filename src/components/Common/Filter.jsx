import React, { useEffect, useMemo, useState } from 'react';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Button from '@mui/joy/Button';
import { useGetSortQuery } from '../../store/apiSlice/homeApi.slice';
import { useAppdispatch, useAppSelector } from '../../store/hook';
import { nanoid } from '@reduxjs/toolkit';
import Switch, { switchClasses } from '@mui/joy/Switch';
import Typography from '@mui/joy/Typography';
import { Formik, Form, FastField } from 'formik';
import { convertToSlug, createYears } from '../../shared/utils';
import { useLocation, useNavigate } from 'react-router-dom';
import { setFilterValues } from '../../store/filterSlice/filter.slice';
import { setCurrentPage, setPage } from '../../store/searchSlice/searchSlice';
import { movieSort, timeSort } from '../../shared/constant';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Filter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const theLoais = useAppSelector((state) => state.submenu.theLoaiRTK);
  const quocGias = useAppSelector((state) => state.submenu.quocGiaRTK);

  const theLoaisAll = useMemo(() => [{ _id: nanoid(), name: 'Tất cả thể loại', slug: '' }, ...theLoais], [theLoais]);
  const quocGiasAll = useMemo(() => [{ _id: nanoid(), name: 'Tất cả quốc gia', slug: '' }, ...quocGias], [quocGias]);

  const yearLists = useMemo(() => createYears(2010, 2026), []);
  const yearsAll = useMemo(() => [{ _id: nanoid(), year: 'Tất cả năm', slug: '' }, ...yearLists], [yearLists]);
  // console.log(yearsAll);

  const filterValues = useAppSelector((state) => state.filter.filterValues);
  const currentPage = useAppSelector((state) => state.search.currentPage);
  const page = useAppSelector((state) => state.search.page);
  // console.log(filterValues);
  const dispatch = useAppdispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Sử dụng useLocation

  const handleSubmit = (values) => {
    const hasChanged = Object.keys(values).some((key) => values[key] !== filterValues[key]);
    if (hasChanged) {
      dispatch(setFilterValues(values));
      // console.log('im here');
      if (page && currentPage !== 1) {
        dispatch(setPage(1));
        dispatch(setCurrentPage(1));
      }
    } else {
      toast.info(`Vui lòng chọn thời gian và danh sách `, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
    if (values.timeSort && values.movieSort) {
      const queryParams = new URLSearchParams({
        sort_field: values.timeSort || '',
        category: values.theLoaiSort || '',
        country: values.quocGiaSort || '',
        year: values.yearSort || '',
        page: values.pageSort || '',
      }).toString();
      const newPath = `/sort/${values.movieSort}?${queryParams}`;
      if (location.pathname.startsWith('/sort')) {
        window.history.pushState(null, '', newPath); // Thay đổi URL mà không điều hướng lại trang
      } else {
        navigate(newPath);
        // console.log(`i have navigated`);
      }
    }
  };
  return (
    <div className='custom-page w-full'>
      <div className='flex justify-end mt-3 mb-3 font-bold'>
        <Typography
          className='underline cursor-pointer hover:text-yellow-400'
          color='warning'
          variant='plain'
          component='label'
          endDecorator={
            <Switch
              checked={isOpen}
              onChange={() => setIsOpen(!isOpen)}
              sx={(theme) => ({
                display: 'inherit',
                '--Switch-thumbShadow': `0 0 0 1px ${theme.vars.palette.background.level3}, 0 1px 4px 0 rgb(0 0 0 / 0.3), 0 1px 2px 0px rgb(0 0 0 / 0.3)`,
                '--Switch-trackWidth': '45px',
                '--Switch-trackHeight': '20px',
                [`&.${switchClasses.checked}`]: {
                  '--Switch-trackBackground': '#65C466',
                  '&:hover': {
                    '--Switch-trackBackground': '#65C466',
                  },
                },
              })}
            />
          }>
          Lọc phim
        </Typography>
      </div>
      {isOpen && (
        <Formik
          initialValues={filterValues} // Sử dụng filterValues từ Redux store
          onSubmit={handleSubmit}>
          {({ setFieldValue, values }) => (
            <Form className='grid grid-cols-1 gap-2 min-[375px]:grid-cols-2 min-[540px]:grid-cols-3 md:grid-cols-5 md:grid-rows-2 min-[900px]:grid-cols-6 min-[900px]:grid-rows-1'>
              <FastField name='timeSort'>
                {({ field }) => (
                  <Select
                    {...field}
                    value={values.timeSort} // Đảm bảo rằng Select luôn có giá trị
                    onChange={(event, newValue) => {
                      if (newValue) {
                        // console.log(newValue);
                        setFieldValue('timeSort', newValue);
                      }
                    }}
                    name='timeSort'
                    variant='solid'
                    placeholder='Thời gian'
                    indicator={<KeyboardArrowDown />}
                    sx={{
                      background: '#474d50',
                      color: '#fffffff',
                      width: '100%',
                      [`& .${selectClasses.indicator}`]: {
                        transition: '0.2s',
                        [`&.${selectClasses.expanded}`]: {
                          transform: 'rotate(-180deg)',
                        },
                      },
                      '& .MuiSelect-indicator': {
                        color: '#191c1d',
                      },
                    }}>
                    {timeSort.map((time) => (
                      <Option
                        className='capitalize'
                        key={time.id}
                        value={time.sortfield}>
                        {time.name}
                      </Option>
                    ))}
                  </Select>
                )}
              </FastField>

              <FastField name='movieSort'>
                {({ field }) => (
                  <Select
                    {...field}
                    value={values.movieSort} // Đảm bảo rằng Select luôn có giá trị
                    onChange={(event, newValue) => {
                      if (newValue) {
                        // console.log(newValue);
                        setFieldValue('movieSort', newValue);
                      }
                    }}
                    name='movieSort'
                    variant='solid'
                    placeholder='Danh sách'
                    indicator={<KeyboardArrowDown />}
                    sx={{
                      background: '#474d50',
                      color: '#fffffff',
                      width: '100%',
                      [`& .${selectClasses.indicator}`]: {
                        transition: '0.2s',
                        [`&.${selectClasses.expanded}`]: {
                          transform: 'rotate(-180deg)',
                        },
                      },
                      '& .MuiSelect-indicator': {
                        color: '#191c1d',
                      },
                    }}>
                    {movieSort.map((movie, index) => (
                      <Option
                        className='capitalize'
                        key={index}
                        value={convertToSlug(movie)}>
                        {movie}
                      </Option>
                    ))}
                  </Select>
                )}
              </FastField>

              <FastField name='theLoaiSort'>
                {({ field }) => (
                  <Select
                    {...field}
                    value={values.theLoaiSort} // Đảm bảo rằng Select luôn có giá trị
                    onChange={(event, newValue) => {
                      // if (newValue) {
                      // console.log(newValue);
                      setFieldValue('theLoaiSort', newValue);
                      // }
                    }}
                    name='theLoaiSort'
                    variant='solid'
                    placeholder='Thể loại'
                    indicator={<KeyboardArrowDown />}
                    sx={{
                      background: '#474d50',
                      color: '#fffffff',
                      width: '100%',
                      [`& .${selectClasses.indicator}`]: {
                        transition: '0.2s',
                        [`&.${selectClasses.expanded}`]: {
                          transform: 'rotate(-180deg)',
                        },
                      },
                      '& .MuiSelect-indicator': {
                        color: '#191c1d',
                      },
                    }}>
                    {theLoaisAll.map((theLoai) => (
                      <Option
                        className='capitalize'
                        key={theLoai._id}
                        value={theLoai.slug}>
                        {theLoai.name}
                      </Option>
                    ))}
                  </Select>
                )}
              </FastField>

              <FastField name='quocGiaSort'>
                {({ field }) => (
                  <Select
                    {...field}
                    value={values.quocGiaSort} // Đảm bảo rằng Select luôn có giá trị
                    onChange={(event, newValue) => {
                      // if (newValue) {
                      // console.log(newValue);
                      setFieldValue('quocGiaSort', newValue);
                      // }
                    }}
                    name='quocGiaSort'
                    variant='solid'
                    placeholder='Quốc gia'
                    indicator={<KeyboardArrowDown />}
                    sx={{
                      background: '#474d50',
                      color: '#fffffff',
                      width: '100%',
                      [`& .${selectClasses.indicator}`]: {
                        transition: '0.2s',
                        [`&.${selectClasses.expanded}`]: {
                          transform: 'rotate(-180deg)',
                        },
                      },
                      '& .MuiSelect-indicator': {
                        color: '#191c1d',
                      },
                    }}>
                    {quocGiasAll.map((quocGia) => (
                      <Option
                        className='capitalize'
                        key={quocGia._id}
                        value={quocGia.slug}>
                        {quocGia.name}
                      </Option>
                    ))}
                  </Select>
                )}
              </FastField>

              <FastField name='yearSort'>
                {({ field }) => (
                  <Select
                    {...field}
                    value={values.yearSort} // Đảm bảo rằng Select luôn có giá trị
                    onChange={(event, newValue) => setFieldValue('yearSort', newValue)} // Sử dụng newValue
                    name='yearSort'
                    variant='solid'
                    placeholder='Năm'
                    indicator={<KeyboardArrowDown />}
                    sx={{
                      background: '#474d50',
                      color: '#fffffff',
                      width: '100%',
                      [`& .${selectClasses.indicator}`]: {
                        transition: '0.2s',
                        [`&.${selectClasses.expanded}`]: {
                          transform: 'rotate(-180deg)',
                        },
                      },
                      '& .MuiSelect-indicator': {
                        color: '#191c1d',
                      },
                    }}>
                    {yearsAll.map((year) => (
                      <Option
                        className='capitalize'
                        key={year._id}
                        value={year.slug}>
                        {year.year}
                      </Option>
                    ))}
                  </Select>
                )}
              </FastField>

              <Button type='submit'>Lọc phim</Button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default Filter;
