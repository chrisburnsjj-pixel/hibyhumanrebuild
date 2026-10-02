import React, { useState, useEffect, useRef } from 'react';
import { Image, Upload, Copy, Check, Trash2, ExternalLink, Loader2 } from 'lucide-react';
import { MediaAsset } from '../../types/cms';
import { uploadMediaImage, getMediaAssets, deleteMediaAsset } from '../../firebase/storage';
import { ConfirmModal } from '../components/ConfirmModal';

export function MediaEditor() {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [assetToDelete, setAssetToDelete] = useState<MediaAsset | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchAssets = async () => {
    setIsLoading(true);
    try {
      const list = await getMediaAssets();
      setAssets(list);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        await uploadMediaImage(files[i], 'media-library');
      }
      await fetchAssets();
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const copyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDelete = async () => {
    if (!assetToDelete) return;
    try {
      await deleteMediaAsset(assetToDelete);
      setAssets((prev) => prev.filter((a) => a.id !== assetToDelete.id));
      setAssetToDelete(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Image className="w-5 h-5 text-cyan-400" />
            <span>Media Assets Library</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Store and manage media files in Firebase Storage with instant CDN URLs for hero banners, portfolio, and avatars.
          </p>
        </div>

        <div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
            id="bulk-media-upload"
          />
          <label
            htmlFor="bulk-media-upload"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-600 hover:from-cyan-400 hover:to-fuchsia-500 text-slate-950 font-bold text-xs transition shadow-md shadow-cyan-500/20 cursor-pointer flex items-center gap-1.5"
          >
            {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            <span>{isUploading ? 'Uploading Files...' : 'Upload Media'}</span>
          </label>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16 text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin text-cyan-400 mb-2" />
          <p className="text-xs font-mono">Loading media assets...</p>
        </div>
      ) : assets.length === 0 ? (
        <div className="p-12 rounded-2xl bg-slate-900/60 border border-dashed border-slate-800 text-center space-y-3">
          <Image className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-sm font-bold text-white">No custom media uploaded yet</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Upload images here to get persistent URLs for your case studies, hero mockups, or team portraits.
          </p>
          <label
            htmlFor="bulk-media-upload"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Select Image File</span>
          </label>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="group relative rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col justify-between"
            >
              <div className="aspect-square bg-slate-950 overflow-hidden relative">
                <img
                  src={asset.downloadUrl}
                  alt={asset.fileName}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              <div className="p-2.5 bg-slate-900 flex items-center justify-between gap-1 border-t border-slate-800">
                <p className="text-[11px] text-slate-300 font-mono truncate flex-1">{asset.fileName}</p>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => copyUrl(asset.downloadUrl, asset.id)}
                    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-cyan-300 transition"
                    title="Copy URL"
                  >
                    {copiedId === asset.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <a
                    href={asset.downloadUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition"
                    title="Open in new tab"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setAssetToDelete(asset)}
                    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-red-400 transition"
                    title="Delete asset"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={Boolean(assetToDelete)}
        title="Delete Media File?"
        message={`Are you sure you want to permanently delete "${assetToDelete?.fileName}"?`}
        confirmText="Delete"
        onConfirm={handleDelete}
        onCancel={() => setAssetToDelete(null)}
      />
    </div>
  );
}
