import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addDoc, collection, deleteDoc, serverTimestamp, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../shared/firebase';
const initialState = {
  bookmarks: [],
  loading: false,
  error: null,
  activeBM: null,
};
export const addBookmarks = createAsyncThunk('bookmarks/add', async ({ userId, movieName, posterPath, thumbPath, slug, originName }, { rejectWithValue }) => {
  try {
    const docRef = await addDoc(collection(db, 'bookmarks'), {
      userId,
      movieName,
      originName,
      posterPath,
      thumbPath,
      slug,
      createdAt: serverTimestamp(),
    });
    return { id: docRef.id, movieName, posterPath, thumbPath, slug, originName, createdAt: new Date().toISOString() };
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
// Thêm async thunk để xóa tất cả bookmark theo userId
export const removeAllBookmarks = createAsyncThunk('bookmarks/removeAll', async (userId, { rejectWithValue }) => {
  try {
    const q = query(collection(db, 'bookmarks'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    // Tạo một mảng các promise để xóa từng bookmark
    const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));

    // Chờ cho tất cả các promise hoàn thành
    await Promise.all(deletePromises);

    return userId; // Trả về userId để có thể sử dụng trong reducer nếu cần
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
    // addBM: (state, action) => {
    //   state.bookmarks.push(action.payload);
    // },
    removeBmId: (state, action) => {
      state.bookmarks = state.bookmarks.filter((bookmark) => bookmark.id !== action.payload);
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
      })
      .addCase(removeBookmarks.fulfilled, (state, action) => {
        // Cập nhật state khi xóa bookmark thành công
        state.bookmarks = state.bookmarks.filter((bookmark) => bookmark.id !== action.payload);
      })
      .addCase(removeAllBookmarks.fulfilled, (state, action) => {
        // Xóa tất cả bookmark trong state
        state.bookmarks = [];
      });
  },
});
export const { setActiveBM, removeBmRdStore } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
