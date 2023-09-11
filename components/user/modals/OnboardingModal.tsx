/* 'use client'
import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useCallback, useState } from 'react'
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'

import useRegisterModal from '@/lib/hooks/useRegisterModal'
import Modal from './Modal'
import Heading from '@/components/Heading'
import Input from '../inputs/Input'
import toast from 'react-hot-toast'
import Button from '../ui/Button'
import useLoginModal from '@/lib/hooks/useLoginModal'
import { signIn } from 'next-auth/react'

const RegisterModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data)
            .then(() => {
                toast.success("Registered Successfully")
                registerModal.onClose();
                loginModal.onOpen();
            })
            .catch((error) => {
                toast.error('Something went wrong.')
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

        const onToggle = useCallback(() => {
            registerModal.onClose();
            loginModal.onOpen();
      }, [registerModal, loginModal])

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading 
                title='Welcome to Postamania.' 
                subTitle='Create an Account'/>
            <Input
                id='email'
                label='Email'
                disabled={isLoading}
                register={register}
                errors={errors} 
                required
            />
            <Input
                id='name'
                label='Name'
                disabled={isLoading}
                register={register}
                errors={errors} 
                required
            />
            <Input
                id='password'
                type='password'
                label='Password'
                disabled={isLoading}
                register={register}
                errors={errors} 
                required
            />
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button
                outline
                icon={FcGoogle}
                label='Connect with Google'
                onClick={() => signIn('google')}
            />
            <Button
                outline
                icon={AiFillGithub}
                label='Connect with GitHub'
                onClick={() => signIn('github')}
            />
            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className='flex flex-row items-center justify-center gap-2'>
                    <p>Already have an account?
                        <span 
                            onClick={onToggle} 
                            className="
                            text-neutral-800
                            cursor-pointer 
                            hover:underline
                            "
                        > Log in</span>
                    </p>
                </div>
            </div>
        </div>
    )

  return (
    <Modal 
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title='Register'
        actionLabel='Continue'
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default RegisterModal */