import * as z from 'zod';

export const PostValidation = z.object ({
    post: z.string().nonempty().min(3, {message: 'Minimum 3 charcaters'}),
    accountId: z.string(),
})

export const CommentValidation = z.object ({
    post: z.string().nonempty().min(3, {message: 'Minimum 3 charcaters'}),
})

export const ImageValidation = z.object({
    imageLink: z.string().url({ message: 'Invalid image URL format' }),
});