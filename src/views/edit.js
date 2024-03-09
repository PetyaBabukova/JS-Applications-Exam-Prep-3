import { html } from '../../node_modules/lit-html/lit-html.js';
import * as catalogService from '../services/catalogService.js';

const editTemplate = (item, submitHandler) => html`
<section id="edit">
    <div class="form">
        <h2>Edit Fact</h2>
        <form @submit=${submitHandler} class="edit-form">
            <input type="text" name="category" id="category" value=${item.category} placeholder="Category" />
            <input type="text" name="image-url" id="image-url" value=${item.imageUrl} placeholder="Image URL" />
            <textarea id="description" name="description" placeholder="Description" rows="10"
                cols="50">${item.description}</textarea>
            <textarea id="additional-info" name="additional-info" placeholder="Additional Info" rows="10"
                cols="50">${item.moreInfo}</textarea>
            <button type="submit">Post</button>
        </form>
    </div>
</section>        
`;

export const editView = (ctx) => {

    const id = ctx.params.itemId
    const onSubmit = (e) => {
        e.preventDefault();
        let isValidData = true;

        const formData = Object.fromEntries(new FormData(e.currentTarget));
        Object.entries(formData).forEach(([key, value]) => {
            if (value == '') {
                isValidData = false;
            }
        })

        if (!isValidData) {
            alert('All fields are required');
            return
        } else {

            const data = {
                category: formData.category,
                imageUrl: formData['image-url'],
                description: formData.description,
                moreInfo: formData['additional-info']
            }

            catalogService.edit(id, data)
                .then(() => {
                    ctx.page.redirect(`/details/${id}`)
                })
        }
    }
    catalogService.getOne(id)
        .then(item => {
            ctx.render(editTemplate(item, onSubmit))

        })
}