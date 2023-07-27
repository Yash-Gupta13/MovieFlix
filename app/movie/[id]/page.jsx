export const dynamic = "force-dynamic"

import SubmitButton from '@/app/Components/SubmitButton';
import { db } from '@/app/db'
import { revalidatePath } from 'next/cache';
import React from 'react'

const getData = async (id)=>{
  const data = await db.comment.findMany({
    where:{
      movieId : id
    },
    orderBy:{
      createdAt : "desc"
    }
  })

  return data;
}

const postData = async(formData)=>{
  "use server";

  const data = await db.comment.create({
    data:{
      message: formData.get('comment') ,
      movieId : formData.get('id')
    },
  });

  revalidatePath('/movie/[id]');

}

const page = async ({params}) => {

  const data = await getData(params.id);
  return (
    <div className='rounded-lg border p-3'>
      <h1 className='text-xl font-semibold mb-5'>Your Opinion</h1>

      <div>
        <form action={postData}>
        <textarea
            name="comment"
            className="w-full border border-teal-500 rounded-lg p-2"
            placeholder="add your comment..."
          ></textarea>
          <input type="hidden" name="id" value={params.id} />
          <SubmitButton />
        </form>
        <div className="mt-5 flex flex-col gap-y-3">
          {data.map((post) => (
            <div key={post.id}>
              <p>{post.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default page
