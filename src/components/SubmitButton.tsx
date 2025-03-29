'use client';
export function SubmitButton({isPending}: { isPending: boolean }) 
{
    return <button
        disabled={isPending}
        className={!isPending ?
            "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer"
            : "bg-blue-500 text-white font-bold py-2 px-4 rounded-full opacity-50 cursor-not-allowed"}
    >
        Submit
    </button>;
}
