import { NextRequest, NextResponse } from "next/server";
import { getServerAuth } from "@/auth";
import SpotifyWebApi from "spotify-web-api-node";

interface CreatePlaylistBody {
	title: string;
	description: string;
	isPublic: boolean;
	tracks: Array<{
		title: string;
		artist: string;
	}>;
}

export async function POST(request: NextRequest) {
	try {
		const session = await getServerAuth();
		if (!session || !(session as any).tokens?.accessToken) {
			return NextResponse.json(
				{ error: "Unauthorized - Please sign in to Spotify" },
				{ status: 401 }
			);
		}

		const body = (await request.json()) as CreatePlaylistBody;
		const { title, description, isPublic, tracks } = body;

		if (!title || !tracks || tracks.length === 0) {
			return NextResponse.json(
				{ error: "Title and tracks are required" },
				{ status: 400 }
			);
		}

		const accessToken = (session as any).tokens.accessToken as string;
		const spotifyApi = new SpotifyWebApi({
			accessToken,
		});

		const trackUris: string[] = [];
		for (const track of tracks) {
			try {
				const searchQuery = `track:${track.title} artist:${track.artist}`;
				const searchResults = await spotifyApi.searchTracks(searchQuery, { limit: 1 });

				if (searchResults.body.tracks && searchResults.body.tracks.items.length > 0) {
					trackUris.push(`spotify:track:${searchResults.body.tracks.items[0].id}`);
				}
			} catch (error) {
				console.error(`Failed to find track: ${track.title} by ${track.artist}`, error);
			}
		}

		if (trackUris.length === 0) {
			return NextResponse.json(
				{ error: "No tracks found on Spotify" },
				{ status: 404 }
			);
		}

		const playlist = await spotifyApi.createPlaylist(title, {
			description: description || "",
			public: isPublic,
		});

		const playlistId = playlist.body.id;

		await spotifyApi.addTracksToPlaylist(playlistId, trackUris);

		const playlistData = await spotifyApi.getPlaylist(playlistId);

		return NextResponse.json({
			success: true,
			playlistId,
			externalUrl: playlistData.body.external_urls.spotify,
		});
	} catch (error) {
		console.error("Spotify playlist creation error:", error);
		return NextResponse.json(
			{ error: "Failed to create playlist on Spotify" },
			{ status: 500 }
		);
	}
}
