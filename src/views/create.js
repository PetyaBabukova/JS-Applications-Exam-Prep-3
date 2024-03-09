import { html } from '../../node_modules/lit-html/lit-html.js';
import * as catalogService from '../services/catalogService.js';

const createTemplate = (SubmitHandler) => html`
<section id="create">
    <div class="form">
        <h2>Add Fact</h2>
        <form @submit=${SubmitHandler} class="create-form">
            <input 
            type="text" 
            name="category" 
            id="category" 
            placeholder="Category" 
            />
            <input 
            type="text" 
            name="image-url" 
            id="image-url" 
            placeholder="Image URL" 
            />
            <textarea 
            id="description" 
            name="description" 
            placeholder="Description" 
            rows="10"
                cols="50">
            </textarea>
            <textarea 
            id="additional-info" 
            name="additional-info" 
            placeholder="Additional Info" 
            rows="10"
                cols="50">
            </textarea>
            <button type="submit">Add Fact</button>
        </form>
    </div>
</section>
`;

export const createView = (ctx) => {
    const SubmitHandler = (e) => {
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

            catalogService.create(data)
                .then(() => {
                    ctx.page.redirect('/catalog')
                })
                .catch(err => alert(err))
        };

    }

    ctx.render(createTemplate(SubmitHandler))
}