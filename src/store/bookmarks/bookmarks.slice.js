import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addDoc, collection, deleteDoc, serverTimestamp, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../shared/firebase';
const initialState = {
  bookmarks: [],
  loading: false,
  error: null,
  activeBM: null,
};
export const addBookmarks = createAsyncThunk('bookmarks/add', async ({ userId, movieName, posterPath, thumbPath }, { rejectWithValue, getState }) => {
  // const state = getState();
  // const existingBookmark = state.bookmarks.bookmarks.map((bookmark) => bookmark.movieName).includes(movieName);

  // console.log('Existing bookmarks:', state.bookmarks.bookmarks); // Kiểm tra danh sách bookmark

  // if (existingBookmark) {
  //   return rejectWithValue('Movie already bookmarked');
  // }

  try {
    const docRef = await addDoc(collection(db, 'bookmarks'), {
      userId,
      movieName,
      posterPath,
      thumbPath,
      createdAt: serverTimestamp(),
    });
    return { id: docRef.id, movieName, posterPath, thumbPath, createdAt: new Date().toISOString() };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
export const removeBookmarks = createAsyncThunk('bookmarks/remove', async (bookmarkId, { rejectWithValue }) => {
  try {
    await deleteDoc(doc(db, 'bookmarks', bookmarkId));
    return bookmarkId;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const convertTimestamp = (timestamp) => {
  if (timestamp && typeof timestamp.toDate === 'function') {
    return timestamp.toDate().toISOString();
  }
  return null;
};
export const fetchBookmarks = createAsyncThunk('bookmarks/fetch', async (userId, { rejectWithValue }) => {
  try {
    const q = query(collection(db, 'bookmarks'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: convertTimestamp(data.createdAt),
      };
    });
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    setActiveBM: (state, action) => {
      state.activeBM = action.payload;
    },
    addBM: (state, action) => {
      state.bookmarks.push(action.payload);
    },
    removeBmRdStore: (state) => {
      state.bookmarks = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBookmarks.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBookmarks.fulfilled, (state, action) => {
        state.loading = false;
        state.bookmarks.push(action.payload);
      })
      .addCase(addBookmarks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBookmarks.fulfilled, (state, action) => {
        state.bookmarks = action.payload;
      });
  },
});
export const { setActiveBM, addBM, removeBmRdStore } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
