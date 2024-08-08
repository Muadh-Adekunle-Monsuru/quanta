'use server';
import { nanoid } from 'nanoid';
import prisma from './db';
import { Item } from '@prisma/client';
import { SquareBottomDashedScissors } from 'lucide-react';

export async function getallboards(id: string) {
	try {
		const boards = await prisma.board.findMany({
			where: {
				OR: [
					{
						creatorId: id,
					},
					{
						public: true,
					},
				],
			},
			orderBy: {
				createdAt: 'desc',
			},
		});
		return boards;
	} catch (e) {
		throw new Error('error fetching boards');
	}
}

export async function createNewBoard(userId: string) {
	try {
		const newBoard = await prisma.board.create({
			data: {
				creatorId: userId,
				name: 'Untitled',
				public: false,
				spaces: [
					{
						name: 'untitled',
						id: nanoid(),
						boards: [
							{ name: 'Board 1', items: [], id: nanoid() },
							{ name: 'Board 2', items: [], id: nanoid() },
							{ name: 'Board 3', items: [], id: nanoid() },
						],
					},
				],
			},
		});

		if (!newBoard) throw new Error('error creating board');

		return newBoard;
	} catch (e) {
		throw new Error(`Error creating board ${e}`);
	}
}

export async function updateBoardTitle(boardId: string, newTitle: string) {
	try {
		const updated = await prisma.board.update({
			where: { id: boardId },
			data: {
				name: newTitle,
			},
		});
		return updated;
	} catch (e) {
		console.log('error updating board title', e);
	}
}

export async function changeVisibility(boardId: string, isPublic: boolean) {
	try {
		const updated = await prisma.board.update({
			where: { id: boardId },
			data: {
				public: isPublic,
			},
		});
		return updated;
	} catch (e) {
		console.log('error updating board visibility', e);
	}
}
export async function Delete(boardId: string) {
	try {
		const updated = await prisma.board.delete({
			where: { id: boardId },
		});
		return updated;
	} catch (e) {
		console.log('error deleting board', e);
	}
}

export async function GetBoard(boardId: string) {
	try {
		const board = await prisma.board.findUnique({
			where: {
				id: boardId,
			},
		});

		if (!board) return null;

		return board;
	} catch (e) {
		console.log('error getting board', e);
	}
}

export async function updateSpaceName(
	boardId: string,
	spaceIndex: number,
	newName: string
) {
	try {
		const oldBoard = await prisma.board.findUnique({
			where: { id: boardId },
		});
		const oldBoardSpaces = oldBoard?.spaces.map((space, index) =>
			index == spaceIndex ? { ...space, name: newName } : space
		);
		// const updatedBoard = { ...oldBoard, spaces: [oldBoardSpaces] };

		const updatePrisma = prisma.board.update({
			where: { id: boardId },
			data: {
				spaces: oldBoardSpaces,
			},
		});
		return updatePrisma;
	} catch (e) {
		console.log('error updating board visibility', e);
	}
}

export async function createNewSpace(boardId: string) {
	try {
		const oldBoard = await prisma.board.findUnique({
			where: { id: boardId },
		});

		const newSpace = {
			name: 'untitled',
			id: nanoid(),
			boards: [
				{ name: 'Board 1', items: [], id: nanoid() },
				{ name: 'Board 2', items: [], id: nanoid() },
				{ name: 'Board 3', items: [], id: nanoid() },
			],
		};

		const updatePrisma = prisma.board.update({
			where: { id: boardId },
			data: {
				spaces: oldBoard?.spaces.concat(newSpace),
			},
		});
		return updatePrisma;
	} catch (e) {
		console.log('error updating board visibility', e);
	}
}

export async function createBoardItem(
	projectId: string,
	spaceId: string,
	boardId: string,
	creatorAvatar: string
) {
	try {
		const board = await prisma.board.findUnique({
			where: { id: projectId },
		});
		let individualCards = 0;

		individualCards =
			board?.spaces
				.filter((space) => space.id == spaceId)
				.flatMap((item) => item.boards.flatMap((card) => card.items)).length ||
			0;

		// console.log(individualCards);

		const newChild = {
			id: nanoid(),
			index: individualCards + 1,
			content: 'Enter something',
			contentImage: '',
			creatorAvatar: creatorAvatar,
			date: new Date(),
			tags: [{ name: '', color: '' }],
		};

		const updatedBoard = board?.spaces.map((space) => {
			if (space.id == spaceId) {
				const specialUpdate = space.boards.map((board) =>
					board.id == boardId
						? { ...board, items: [...board.items, newChild] }
						: board
				);
				return { ...space, boards: specialUpdate };
			} else {
				return space;
			}
		});

		// console.log(updatedBoard);
		const updated = await prisma.board.update({
			where: { id: projectId },
			data: {
				spaces: updatedBoard,
			},
		});
		return updated;
	} catch (e) {
		console.log('error creating board item', e);
	}
}

export async function deleteSpace(boardId: string, spaceIndex: number) {
	try {
		const oldboard = await prisma.board.findUnique({
			where: { id: boardId },
		});
		const newBoardSpaces = oldboard?.spaces.filter(
			(space, index) => index !== spaceIndex
		);

		const updatedBoard = await prisma.board.update({
			where: {
				id: boardId,
			},
			data: {
				spaces: newBoardSpaces,
			},
		});

		if (!updatedBoard) return undefined;

		return updatedBoard;
	} catch (e) {
		console.log('error deleting space', e);
	}
}

export async function updateSpaceBoardName(
	projectId: string,
	spaceId: string,
	prevBoardName: string,
	newName: string
) {
	const oldBoard = await prisma.board.findUnique({
		where: { id: projectId },
	});

	const updatedBoard = oldBoard?.spaces.map((space) => {
		if (space.id == spaceId) {
			const specialUpdate = space.boards.map((board) =>
				board.name == prevBoardName ? { ...board, name: newName } : board
			);
			return { ...space, boards: specialUpdate };
		} else {
			return space;
		}
	});

	const updated = await prisma.board.update({
		where: { id: projectId },
		data: {
			spaces: updatedBoard,
		},
	});
	return updated;
}

export async function updateItemContent(
	projectId: string,
	spaceId: string,
	boardId: string,
	itemId: string,
	newContent: string
) {
	try {
		const project = await prisma.board.findUnique({
			where: { id: projectId },
		});

		const updatedContent = project?.spaces.map((space) => {
			if (space.id == spaceId) {
				const updatedBoards = space.boards.map((board) => {
					if (board.id == boardId) {
						const updateItems = board.items.map((item) => {
							return item.id == itemId
								? { ...item, content: newContent }
								: item;
						});
						return { ...board, items: updateItems };
					} else {
						return board;
					}
				});
				return { ...space, boards: updatedBoards };
			} else {
				return space;
			}
		});

		const update = await prisma.board.update({
			where: { id: projectId },
			data: {
				spaces: updatedContent,
			},
		});

		// console.log(updatedContent);
		return update;
	} catch (e) {
		console.log('error updating content', e);
	}
}

export async function updateItemImage(
	projectId: string,
	spaceId: string,
	boardId: string,
	itemId: string,
	contentUrl: string
) {
	try {
		const project = await prisma.board.findUnique({
			where: { id: projectId },
		});

		const updatedContent = project?.spaces.map((space) => {
			if (space.id == spaceId) {
				const updatedBoards = space.boards.map((board) => {
					if (board.id == boardId) {
						const updateItems = board.items.map((item) => {
							return item.id == itemId
								? { ...item, contentImage: contentUrl }
								: item;
						});
						return { ...board, items: updateItems };
					} else {
						return board;
					}
				});
				return { ...space, boards: updatedBoards };
			} else {
				return space;
			}
		});

		const update = await prisma.board.update({
			where: { id: projectId },
			data: {
				spaces: updatedContent,
			},
		});

		return update;
	} catch (e) {
		console.log('error updating content', e);
	}
}

export async function deleteItem(
	projectId: string,
	spaceId: string,
	boardId: string,
	itemId: string
) {
	console.log(projectId, spaceId, boardId, itemId);
	try {
		const project = await prisma.board.findUnique({
			where: { id: projectId },
		});

		const updatedContent = project?.spaces.map((space) => {
			if (space.id == spaceId) {
				const updatedBoards = space.boards.map((board) => {
					if (board.id == boardId) {
						const updateItems = board.items.filter(
							(item) => item.id !== itemId
						);
						return { ...board, items: updateItems };
					} else {
						return board;
					}
				});
				return { ...space, boards: updatedBoards };
			} else {
				return space;
			}
		});

		const update = await prisma.board.update({
			where: { id: projectId },
			data: {
				spaces: updatedContent,
			},
		});

		return update;
	} catch (e) {
		console.log('error updating content', e);
	}
}

export async function updateCardPosition(
	projectId: string,
	spaceId: string,
	newBoardId: string,
	itemId: string
) {
	try {
		const project = await prisma.board.findUnique({
			where: { id: projectId },
		});

		let oldData: Item[] = [];
		//remove from previous board
		const filteredBoard = project?.spaces.map((space) => {
			if (space.id == spaceId) {
				const specialUpdate = space.boards.map((board) => {
					const temp = board.items.filter((item) => item.id == itemId);
					if (temp.length > 0) {
						oldData.push(temp[0]);
					}
					const filterd = board.items.filter((item) => item.id !== itemId);
					return { ...board, items: filterd };
				});
				return { ...space, boards: specialUpdate };
			} else {
				return space;
			}
		});

		const updated = await prisma.board.update({
			where: { id: projectId },
			data: {
				spaces: filteredBoard,
			},
		});

		const added = updated.spaces.map((space) => {
			if (space.id == spaceId) {
				const filtering = space.boards.map((board) =>
					board.id == newBoardId
						? { ...board, items: [...board.items, oldData[0]] }
						: board
				);
				return { ...space, boards: filtering };
			} else {
				return space;
			}
		});

		const newUpdated = await prisma.board.update({
			where: { id: projectId },
			data: {
				spaces: added,
			},
		});

		return updated;
	} catch (e) {
		console.log('error creating board item', e);
	}
}
