'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { dataProps } from './_types/dataTypes';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Home = () => {
  const regExp = {
    // name: /^[가-힣a-zA-Z]+$/,
    phone_number: /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/,
    email:
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
  };

  const schema = yup.object().shape({
    // name: yup
    //   .string()
    //   .matches(regExp.name, '한글 및 영문만 입력 가능합니다.')
    //   .nullable(),
    phone_number: yup
      .string()
      .required('연락처는 필수 입니다.')
      .matches(regExp.phone_number, '연락처 형식이 맞지 않습니다.'),
    email: yup
      .string()
      .required('이메일은 필수 입니다.')
      .matches(regExp.email, '이메일 형식이 맞지 않습니다.'),
    contents: yup.string().required('내용은 필수 입니다.'),
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<dataProps>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      phone_number: '',
      email: '',
      contents: '',
    },
  });

  // mailto 사용법
  // const onSubmit = (data: dataProps) => {
  //   if (data) {
  //     const { name, phone_number, email, contents } = data;
  //     try {
  //       location.href = `MAILTO:sosopa94@gmail.com?subject=모빌리버스 투자정보 문의하기 메일&body=이름 : ${name}%0A%0A연락처 : ${phone_number}%0A%0A이메일: ${email}%0A%0A내용 : ${contents}`;
  //       reset();
  //     } catch (e) {
  //       console.log('e', e);
  //     }
  //   }
  // };

  const onSubmit = async (data: dataProps) => {
    if (data) {
      try {
        const res = await axios
          .post('/api/nodemailer', JSON.stringify(data))
          .then((r) => {
            console.log('r', r);
            return r;
          })
          .catch((e) => {
            console.log('e', e);
          });
        toast.success('문의사항 전송에 성공하였습니다.');
      } catch (e) {
        console.log('e', e);
        toast.error('문의사항 전송에 실패하였습니다.');
      }
    }
  };

  useEffect(() => {
    const watchPhone = watch('phone_number');
    setValue(
      'phone_number',
      watchPhone
        ?.replace(/-/g, '')
        .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)
    );
  }, [watch('phone_number')]);

  return (
    <>
      <article className="w-full h-full bg-[#f8f6ff] flex justify-center desktop:py-[7.75rem] py-[7rem] mobile:py-[3.5rem]">
        <div className="desktop:flex desktop:justify-between desktop:items-center block desktop:w-[75rem] w-full h-full desktop:mx-0 tablet:mx-12 mobile:mx-6">
          <div className="desktop:mb-0 mb-[3.312rem]">
            <p className="desktop:text-[2.813rem] text-4xl mobile:text-3xl text-black font-bold leading-[1.56] tracking-[-1.8px]">
              문의사항
            </p>
            <p className="tablet:text-[1.5rem] text-xl mobile:text-lg text font-bold text-[#5048e5] pt-4 tracking-[-0.96px]">
              <a href="mailto:sosopa94@gmail.com" className="no-underline">
                sosopa94@gmail.com
              </a>
            </p>
          </div>
          <div>
            <form
              className="flex flex-col gap-12 mobile:gap-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="w-full flex flex-col">
                <label
                  htmlFor="name"
                  className="font-medium text-[1.25rem] mobile:text-base tracking-[-0.8px] mb-3"
                >
                  이름
                </label>
                <input
                  {...register('name')}
                  type="text"
                  name="name"
                  placeholder="이름을 입력해 주세요."
                  className="desktop:w-[49.75rem] w-full h-[3.125rem] border-solid border border-[#b2aec3] rounded-[0.938rem] px-[1.312rem]"
                  autoComplete="off"
                />
                {errors?.name && watch('name') !== '' ? (
                  <span className="text-[#D14343] ml-3 pt-1 text-xs">
                    {errors.name?.message}
                  </span>
                ) : null}
              </div>
              <div className="w-full flex flex-col">
                <label
                  htmlFor="phone_number"
                  className="font-medium text-[1.25rem] mobile:text-base tracking-[-0.8px] after:content-['*'] after:ml-1 mb-3"
                >
                  연락처
                </label>
                <input
                  {...register('phone_number')}
                  type="text"
                  name="phone_number"
                  placeholder="연락처를 입력해 주세요."
                  maxLength={13}
                  className="desktop:w-[49.75rem] w-full h-[3.125rem] border-solid border border-[#b2aec3] rounded-[0.938rem] px-[1.312rem]"
                  autoComplete="off"
                />
                {errors?.phone_number ? (
                  <span className="text-[#D14343] ml-3 pt-1 text-xs">
                    {errors.phone_number?.message}
                  </span>
                ) : null}
              </div>
              <div className="w-full flex flex-col">
                <label
                  htmlFor="email"
                  className="font-medium text-[1.25rem] mobile:text-base tracking-[-0.8px] after:content-['*'] after:ml-1 mb-3"
                >
                  E-mail
                </label>
                <input
                  {...register('email')}
                  type="text"
                  name="email"
                  placeholder="이메일을 입력해 주세요."
                  className="desktop:w-[49.75rem] w-full h-[3.125rem] border-solid border border-[#b2aec3] rounded-[0.938rem] px-[1.312rem]"
                  autoComplete="off"
                />
                {errors?.email ? (
                  <span className="text-[#D14343] ml-3 pt-1 text-xs">
                    {errors.email?.message}
                  </span>
                ) : null}
              </div>
              <div className="w-full flex flex-col">
                <label
                  htmlFor="contents"
                  className="font-medium text-[1.25rem] mobile:text-base tracking-[-0.8px] after:content-['*'] after:ml-1 mb-3"
                >
                  내용
                </label>
                <textarea
                  {...register('contents')}
                  name="contents"
                  placeholder="내용을 입력해 주세요."
                  className="desktop:w-[49.75rem] w-full h-[12.5rem] border-solid border border-[#b2aec3] rounded-[0.938rem] px-[1.312rem] pt-[0.938rem] resize-none"
                />
                {errors?.contents ? (
                  <span className="text-[#D14343] ml-3 pt-1 text-xs">
                    {errors.contents?.message}
                  </span>
                ) : null}
              </div>
              <button
                type="submit"
                className="desktop:w-[49.75rem] w-full h-[2.75rem] bg-[#5048e5] border-solid border rounded-xl text-white text-[1.125rem] mobile:text-base font-bold leading-[1.11] tracking-[-0.045rem] hover:bg-secondary ease-in-out duration-300"
              >
                문의하기
              </button>
            </form>
          </div>
        </div>
        <ToastContainer />
      </article>
    </>
  );
};

export default Home;
