import {Metadata} from "next";

// export const metadata: Metadata = {
//     title: '유저 페이지',
//     description: '유저 페이지입니다.',
// }


export async function generateMetadata(
    {
        searchParams,
    }: {
        searchParams: Promise<{ q?: string; }>;
    }): Promise<Metadata> {
    const param = await searchParams;

    return {
        title: `${param.q} 상세 페이지`,
        description: `${param.q} 상세 페이지 결과입니다.`,
    };
}


function UserPage() {
    return (
        <div className='box slot-2'>
            Users Slot
        </div>
    );
}

export default UserPage;