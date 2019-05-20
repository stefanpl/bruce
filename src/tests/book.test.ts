import * as assert from 'assert';
import { getAllBooks, saveBook } from '../bookFunctions';

describe('books', function() {

  it('can be retrieved from the database', async function () {

    let allBooks = await getAllBooks();
    let newBook = {
      title: 'The subtle art of not giving a fuck',
      author: 'Mark Manson',
      notes: 'Recommended by Tudor. Already acquired, will read it soon.',
    }
    await saveBook(newBook);
    let allBooksAfterSaving = await getAllBooks();
    assert.equal(allBooks.length + 1, allBooksAfterSaving.length, 
      'There should be one more book after saving');
  
  });

});

export default false;