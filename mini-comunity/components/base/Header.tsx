import {type Session} from "next-auth";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {signOut} from "next-auth/react";

interface HeaderProps {
    session: Session | null;
}

function Header(props: HeaderProps) {
    const {session} = props;

    return <header className='p-2 flext items-center justify-between border-b'>
        <Link href='/'
              className='text-xl font-semibold'>
            Mini Community
        </Link>

        <div className='flex items-center justify-end gap-2'>
            {!!session ? (
                <>
                    <span className='text-sm'>{`Hello, ${session.user?.name}!`}</span>
                    <Button size='sm' variant='outline' onClick={() => signOut({callbackUrl: '/'})}>
                        Sign Out
                    </Button>
                </>
            ) : (
                <Button size='sm' variant='outline' asChild>
                    <Link href='/sign-in'>Sign In</Link>
                </Button>
            )}
        </div>
    </header>;
}

export default Header;