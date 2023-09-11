'use client'

import { signIn } from 'next-auth/react';
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useCallback, useState } from 'react'
import {
    SubmitHandler,
    useForm
} from 'react-hook-form'

import useRegisterModal from '@/lib/hooks/useRegisterModal'
import Modal from './Modal'
import Heading from '@/components/Heading'
import toast from 'react-hot-toast'
import Button from '../ui/Button'
import useLoginModal from '@/lib/hooks/useLoginModal'
import { useRouter } from 'next/navigation';
import { logInFormData, loginUserSchema } from '@/lib/validations/user';
import { zodResolver } from '@hookform/resolvers/zod';
import InputLogin from '../inputs/InputLogin';
import { User } from '@prisma/client';

interface LogInModalProps {
  currentUser?: User | null;
}

const LoginModal: React.FC<LogInModalProps> = ({
  currentUser
}) => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);
  
    const { 
      register, 
      handleSubmit,
      formState: {
        errors,
      },
    } = useForm<logInFormData>({
      resolver: zodResolver(loginUserSchema),
      defaultValues: {
        email: '',
        password: ''
      },
    });
    
    const onSubmit: SubmitHandler<logInFormData> =
    (data: logInFormData) => {
      setIsLoading(true);
  
      signIn('credentials', { 
        ...data, 
        redirect: false,
      }).then((callback) => {
        setIsLoading(false);

        if (callback?.ok && !callback?.error) {
          toast.success('Logged in');
          router.refresh();
          loginModal.onClose();
        }
        
        if (callback?.error)  {
            toast.error(callback.error);
        }
      });
    }
    
    if(currentUser?.role === "ADMIN"){
      router.push("/profile")
    }

    
/*     if(currentUser?.role === "USER"){
      router.push("/")
    }

    if(currentUser?.role === "ADMIN"){
      router.push("/profile")
    } */

    
    const onToggle = useCallback(() => {
      loginModal.onClose();
      registerModal.onOpen();
    }, [loginModal, registerModal])
  
    const bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Welcome back"
          subTitle="Login to your account!"
        />
        <InputLogin
          id="email"
          label="Email"
          type="email"
          disabled={isLoading}
          register={register}  
          required
        /> {errors.email && <span className='text-rose-500 ml-1'>{errors.email.message}</span>}
        <InputLogin
          id="password"
          label="Password"
          type="password"
          disabled={isLoading}
          register={register}
          required
        /> {errors.password && <span className='text-rose-500 ml-1'>{errors.password.message}</span>}
      </div>
    )
  
    const footerContent = (
      <div className="flex flex-col gap-4 mt-3">
        <hr />
        <Button 
          outline 
          label="Continue with Google"
          icon={FcGoogle}
          onClick={() => signIn('google')}
        />
        <Button 
          outline 
          label="Continue with Github"
          icon={AiFillGithub}
          onClick={() => signIn('github')}
        />
        <div className="
        text-neutral-500 text-center mt-4 font-light">
          <p>First time using Postamania?
            <span 
              onClick={onToggle} 
              className="
                text-neutral-800
                cursor-pointer 
                hover:underline
              "
              > Create an account</span>
          </p>
        </div>
      </div>
    )
  
    return (
      <Modal
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title="Login"
        actionLabel="Continue"
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
      />
    );
  }
  
  export default LoginModal;